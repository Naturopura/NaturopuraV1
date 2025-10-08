import { Request, Response } from 'express';
import WeatherAlertService, { WeatherData } from '../services/weatherAlertService';

export class WeatherAlertController {
  /**
   * Send weather alert to current user
   */
  static async sendUserAlert(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?._id;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const { temp, humidity, windSpeed, pressure, weatherMain, weatherDescription } = req.body;

      if (!temp || !humidity || !windSpeed || !pressure || !weatherMain) {
        res.status(400).json({ 
          message: 'Missing required weather data fields' 
        });
        return;
      }

      const weatherData: WeatherData = {
        temp: parseFloat(temp),
        humidity: parseFloat(humidity),
        windSpeed: parseFloat(windSpeed),
        pressure: parseFloat(pressure),
        weatherMain,
        weatherDescription: weatherDescription || ''
      };

      const alertSent = await WeatherAlertService.sendUserAlert(userId, weatherData);
      
      if (alertSent) {
        res.json({ 
          message: 'Weather alert sent successfully',
          alerts: WeatherAlertService.analyzeWeather(weatherData)
        });
      } else {
        res.json({ 
          message: 'No weather alerts to send',
          alerts: []
        });
      }

    } catch (error) {
      console.error('Error sending user weather alert:', error);
      res.status(500).json({ 
        message: 'Failed to send weather alert',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Send weather alerts to all farmers in a location
   */
  static async sendLocationAlerts(req: Request, res: Response): Promise<void> {
    try {
      const { latitude, longitude, temp, humidity, windSpeed, pressure, weatherMain, weatherDescription, radiusKm } = req.body;

      if (!latitude || !longitude || !temp || !humidity || !windSpeed || !pressure || !weatherMain) {
        res.status(400).json({ 
          message: 'Missing required fields: latitude, longitude, and weather data' 
        });
        return;
      }

      const weatherData: WeatherData = {
        temp: parseFloat(temp),
        humidity: parseFloat(humidity),
        windSpeed: parseFloat(windSpeed),
        pressure: parseFloat(pressure),
        weatherMain,
        weatherDescription: weatherDescription || ''
      };

      const result = await WeatherAlertService.sendLocationBasedAlerts(
        parseFloat(latitude),
        parseFloat(longitude),
        weatherData,
        radiusKm ? parseFloat(radiusKm) : 50
      );

      res.json({
        message: 'Location-based weather alerts sent',
        result,
        alerts: WeatherAlertService.analyzeWeather(weatherData)
      });

    } catch (error) {
      console.error('Error sending location-based weather alerts:', error);
      res.status(500).json({ 
        message: 'Failed to send location-based weather alerts',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Analyze weather data and return alerts without sending SMS
   */
  static async analyzeWeather(req: Request, res: Response): Promise<void> {
    try {
      const { temp, humidity, windSpeed, pressure, weatherMain, weatherDescription } = req.body;

      if (!temp || !humidity || !windSpeed || !pressure || !weatherMain) {
        res.status(400).json({ 
          message: 'Missing required weather data fields' 
        });
        return;
      }

      const weatherData: WeatherData = {
        temp: parseFloat(temp),
        humidity: parseFloat(humidity),
        windSpeed: parseFloat(windSpeed),
        pressure: parseFloat(pressure),
        weatherMain,
        weatherDescription: weatherDescription || ''
      };

      const alerts = WeatherAlertService.analyzeWeather(weatherData);
      const shouldSend = WeatherAlertService.shouldSendAlert(weatherData);

      res.json({
        alerts,
        shouldSend,
        weatherData
      });

    } catch (error) {
      console.error('Error analyzing weather data:', error);
      res.status(500).json({ 
        message: 'Failed to analyze weather data',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Get weather alert thresholds and configuration
   */
  static async getAlertConfig(req: Request, res: Response): Promise<void> {
    try {
      // This would typically come from environment variables or database
      const config = {
        tempHigh: 35,
        tempLow: 5,
        humidityHigh: 85,
        humidityLow: 20,
        windHigh: 15,
        pressureLow: 1000,
        pressureHigh: 1030,
        alertRadiusKm: 50
      };

      res.json({ config });
    } catch (error) {
      console.error('Error getting alert configuration:', error);
      res.status(500).json({ 
        message: 'Failed to get alert configuration',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export default WeatherAlertController;
