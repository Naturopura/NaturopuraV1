import { sendSingleSMS } from './smsService';
import User from '../models/User';

export interface WeatherAlert {
  type: 'severe' | 'moderate' | 'info';
  condition: string;
  message: string;
  severity: number; // 1-5 scale
}

export interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  weatherMain: string;
  weatherDescription: string;
}

export class WeatherAlertService {
  private static readonly ALERT_THRESHOLDS = {
    TEMP_HIGH: 32, // °C (lowered from 35°C)
    TEMP_LOW: 8,   // °C (raised from 5°C)
    HUMIDITY_HIGH: 80, // % (lowered from 85%)
    HUMIDITY_LOW: 25,  // % (raised from 20%)
    WIND_HIGH: 10,     // m/s (lowered from 15 m/s)
    PRESSURE_LOW: 1005, // hPa (raised from 1000 hPa)
    PRESSURE_HIGH: 1025 // hPa (lowered from 1030 hPa)
  };

  /**
   * Analyze weather data and determine if alerts should be sent
   */
  static analyzeWeather(weatherData: WeatherData): WeatherAlert[] {
    const alerts: WeatherAlert[] = [];

    // Temperature alerts
    if (weatherData.temp >= this.ALERT_THRESHOLDS.TEMP_HIGH) {
      alerts.push({
        type: 'severe',
        condition: 'High Temperature',
        message: `⚠️ HIGH TEMPERATURE ALERT: Temperature is ${weatherData.temp}°C. This may affect crop growth. Consider additional irrigation and shade protection.`,
        severity: 4
      });
    } else if (weatherData.temp <= this.ALERT_THRESHOLDS.TEMP_LOW) {
      alerts.push({
        type: 'moderate',
        condition: 'Low Temperature',
        message: `❄️ LOW TEMPERATURE ALERT: Temperature is ${weatherData.temp}°C. Protect sensitive crops from frost damage.`,
        severity: 3
      });
    }

    // Humidity alerts
    if (weatherData.humidity >= this.ALERT_THRESHOLDS.HUMIDITY_HIGH) {
      alerts.push({
        type: 'moderate',
        condition: 'High Humidity',
        message: `💧 HIGH HUMIDITY ALERT: Humidity is ${weatherData.humidity}%. Monitor for fungal diseases and ensure proper ventilation.`,
        severity: 2
      });
    } else if (weatherData.humidity <= this.ALERT_THRESHOLDS.HUMIDITY_LOW) {
      alerts.push({
        type: 'moderate',
        condition: 'Low Humidity',
        message: `🌵 LOW HUMIDITY ALERT: Humidity is ${weatherData.humidity}%. Increase irrigation frequency to prevent crop stress.`,
        severity: 2
      });
    }

    // Wind alerts
    if (weatherData.windSpeed >= this.ALERT_THRESHOLDS.WIND_HIGH) {
      alerts.push({
        type: 'severe',
        condition: 'High Wind',
        message: `💨 HIGH WIND ALERT: Wind speed is ${weatherData.windSpeed} m/s. Secure loose items and protect crops from wind damage.`,
        severity: 4
      });
    }

    // Pressure alerts (indicates weather changes)
    if (weatherData.pressure <= this.ALERT_THRESHOLDS.PRESSURE_LOW) {
      alerts.push({
        type: 'info',
        condition: 'Low Pressure',
        message: `🌧️ WEATHER CHANGE ALERT: Low atmospheric pressure detected. Rain or storm conditions likely. Prepare for wet weather.`,
        severity: 2
      });
    } else if (weatherData.pressure >= this.ALERT_THRESHOLDS.PRESSURE_HIGH) {
      alerts.push({
        type: 'info',
        condition: 'High Pressure',
        message: `☀️ WEATHER CHANGE ALERT: High atmospheric pressure detected. Clear, stable weather expected. Good conditions for outdoor activities.`,
        severity: 1
      });
    }

    // Weather condition specific alerts
    switch (weatherData.weatherMain.toLowerCase()) {
      case 'thunderstorm':
        alerts.push({
          type: 'severe',
          condition: 'Thunderstorm',
          message: `⚡ SEVERE WEATHER ALERT: Thunderstorm detected! Take shelter immediately. Avoid open fields and tall structures.`,
          severity: 5
        });
        break;
      case 'rain':
        if (weatherData.humidity > 90) {
          alerts.push({
            type: 'moderate',
            condition: 'Heavy Rain',
            message: `🌧️ RAIN ALERT: Heavy rainfall expected. Check drainage systems and protect crops from waterlogging.`,
            severity: 3
          });
        }
        break;
      case 'snow':
        alerts.push({
          type: 'moderate',
          condition: 'Snow',
          message: `❄️ SNOW ALERT: Snow conditions detected. Protect crops from frost and ensure proper insulation.`,
          severity: 3
        });
        break;
      case 'fog':
        alerts.push({
          type: 'info',
          condition: 'Fog',
          message: `🌫️ FOG ALERT: Reduced visibility due to fog. Exercise caution during outdoor activities.`,
          severity: 1
        });
        break;
      case 'clouds':
        if (weatherData.humidity > 70) {
          alerts.push({
            type: 'info',
            condition: 'Cloudy Conditions',
            message: `☁️ CLOUDY WEATHER ALERT: Overcast conditions with ${weatherData.humidity}% humidity. Monitor crop health and ensure adequate sunlight exposure.`,
            severity: 1
          });
        }
        break;
    }

    // Always add a default weather update if no other alerts are generated
    if (alerts.length === 0) {
      alerts.push({
        type: 'info',
        condition: 'Weather Update',
        message: `🌤️ WEATHER UPDATE: Current conditions are ${weatherData.weatherDescription} with temperature ${weatherData.temp}°C, humidity ${weatherData.humidity}%, and wind speed ${weatherData.windSpeed} m/s.`,
        severity: 1
      });
    }

    return alerts;
  }

  /**
   * Send weather alerts to all farmers in a specific location
   */
  static async sendLocationBasedAlerts(
    latitude: number,
    longitude: number,
    weatherData: WeatherData,
    radiusKm: number = 50
  ): Promise<{ success: number; failed: number; total: number }> {
    try {
      // Find farmers within the specified radius
      const farmers = await User.find({
        role: 'farmer',
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            $maxDistance: radiusKm * 1000 // Convert km to meters
          }
        },
        phoneNumber: { $exists: true, $ne: null }
      }).select('phoneNumber name');

      if (farmers.length === 0) {
        console.log('No farmers found in the specified location for weather alerts');
        return { success: 0, failed: 0, total: 0 };
      }

      const alerts = this.analyzeWeather(weatherData);
      if (alerts.length === 0) {
        console.log('No weather alerts to send');
        return { success: 0, failed: 0, total: 0 };
      }

      // Group alerts by severity and create comprehensive message
      const severeAlerts = alerts.filter(a => a.severity >= 4);
      const moderateAlerts = alerts.filter(a => a.severity >= 2 && a.severity < 4);
      const infoAlerts = alerts.filter(a => a.severity === 1);

      let message = '🌤️ NATUROPURA WEATHER ALERT 🌤️\n\n';
      
      if (severeAlerts.length > 0) {
        message += '🚨 SEVERE ALERTS:\n';
        severeAlerts.forEach(alert => {
          message += `• ${alert.message}\n`;
        });
        message += '\n';
      }

      if (moderateAlerts.length > 0) {
        message += '⚠️ MODERATE ALERTS:\n';
        moderateAlerts.forEach(alert => {
          message += `• ${alert.message}\n`;
        });
        message += '\n';
      }

      if (infoAlerts.length > 0) {
        message += 'ℹ️ INFORMATION:\n';
        infoAlerts.forEach(alert => {
          message += `• ${alert.message}\n`;
        });
        message += '\n';
      }

      message += `📍 Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}\n`;
      message += `🕐 Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\n`;
      message += 'Stay safe and protect your crops! 🌱';

      // Send SMS to all farmers
      let successCount = 0;
      let failedCount = 0;

      for (const farmer of farmers) {
        try {
          await sendSingleSMS(farmer.phoneNumber!, message);
          successCount++;
          console.log(`Weather alert sent to ${farmer.name} (${farmer.phoneNumber})`);
        } catch (error) {
          failedCount++;
          console.error(`Failed to send weather alert to ${farmer.name} (${farmer.phoneNumber}):`, error);
        }
      }

      return {
        success: successCount,
        failed: failedCount,
        total: farmers.length
      };

    } catch (error) {
      console.error('Error sending location-based weather alerts:', error);
      throw error;
    }
  }

  /**
   * Send weather alert to a specific user
   */
  static async sendUserAlert(
    userId: string,
    weatherData: WeatherData
  ): Promise<boolean> {
    try {
      const user = await User.findById(userId).select('phoneNumber name role');
      
      if (!user || !user.phoneNumber || user.role !== 'farmer') {
        throw new Error('User not found or not eligible for weather alerts');
      }

      const alerts = this.analyzeWeather(weatherData);
      if (alerts.length === 0) {
        return false; // No alerts to send
      }

      // Create personalized message - simplified for testing
      let message = `Hello ${user.name}! Weather update: ${alerts[0].message}`;
      
      // Limit message to 160 characters for single SMS
      if (message.length > 160) {
        message = message.substring(0, 157) + '...';
      }

      console.log(`Sending weather alert to ${user.name} (${user.phoneNumber}): ${message}`);
      await sendSingleSMS(user.phoneNumber, message);
      console.log(`Weather alert sent to ${user.name} (${user.phoneNumber})`);
      
      return true;

    } catch (error) {
      console.error('Error sending user weather alert:', error);
      throw error;
    }
  }

  /**
   * Check if weather conditions warrant an alert
   */
  static shouldSendAlert(weatherData: WeatherData): boolean {
    const alerts = this.analyzeWeather(weatherData);
    return alerts.length > 0; // Send any alerts, including info alerts
  }
}

export default WeatherAlertService;
