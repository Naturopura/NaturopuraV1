import cron from 'node-cron';
import axios from 'axios';
import WeatherAlertService from '../services/weatherAlertService';
import User from '../models/User';

// Weather API configuration
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'your_api_key_here';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Alert thresholds
const ALERT_THRESHOLDS = {
  RAINY_WEATHER: ['rain', 'drizzle', 'thunderstorm', 'snow'],
  HOT_TEMPERATURE: 35, // Celsius
  CHECK_INTERVAL: '*/30 * * * *', // Every 30 minutes
  LOCATIONS: [
    { name: 'Bhubaneswar', lat: 20.2961, lon: 85.8245 },
    { name: 'Cuttack', lat: 20.4625, lon: 85.8830 },
    { name: 'Puri', lat: 19.8133, lon: 85.8315 }
  ]
};

export class WeatherAlertScheduler {
  private static isRunning = false;

  static start() {
    if (this.isRunning) {
      console.log('Weather alert scheduler is already running');
      return;
    }

    console.log('Starting weather alert scheduler...');
    
    cron.schedule(ALERT_THRESHOLDS.CHECK_INTERVAL, async () => {
      console.log('Checking weather conditions for automatic alerts...');
      
      try {
        await this.checkWeatherForAllLocations();
      } catch (error) {
        console.error('Error in weather alert scheduler:', error);
      }
    });

    this.isRunning = true;
    console.log('Weather alert scheduler started successfully');
  }

  static stop() {
    console.log('Stopping weather alert scheduler...');
    this.isRunning = false;
    console.log('Weather alert scheduler stopped');
  }

  private static async checkWeatherForAllLocations() {
    for (const location of ALERT_THRESHOLDS.LOCATIONS) {
      try {
        await this.checkLocationWeather(location);
      } catch (error) {
        console.error(`Error checking weather for ${location.name}:`, error);
      }
    }
  }

  private static async checkLocationWeather(location: { name: string; lat: number; lon: number }) {
    try {
      const response = await axios.get(WEATHER_API_URL, {
        params: {
          lat: location.lat,
          lon: location.lon,
          appid: WEATHER_API_KEY,
          units: 'metric'
        }
      });

      const weatherData = {
        temp: response.data.main.temp,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind?.speed || 0,
        pressure: response.data.main.pressure,
        weatherMain: response.data.weather[0].main,
        weatherDescription: response.data.weather[0].description
      };

      // Check if conditions warrant automatic alerts
      const shouldSendAlert = this.shouldSendAutomaticAlert(weatherData);
      
      if (shouldSendAlert) {
        console.log(`Automatic weather alert triggered for ${location.name}`);
        await this.sendAutomaticAlerts(location, weatherData);
      }

    } catch (error) {
      console.error(`Error fetching weather for ${location.name}:`, error);
    }
  }

  private static shouldSendAutomaticAlert(weatherData: any): boolean {
    // Check for rainy weather
    const isRainy = ALERT_THRESHOLDS.RAINY_WEATHER.some(
      condition => weatherData.weatherMain.toLowerCase().includes(condition)
    );
    
    // Check for hot weather
    const isHot = weatherData.temp >= ALERT_THRESHOLDS.HOT_TEMPERATURE;
    
    return isRainy || isHot;
  }

  private static async sendAutomaticAlerts(location: any, weatherData: any) {
    try {
      // Find all farmers in the location
      const farmers = await User.find({
        role: 'farmer',
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [location.lon, location.lat]
            },
            $maxDistance: 50000 // 50km radius
          }
        },
        phoneNumber: { $exists: true, $ne: null }
      }).select('phoneNumber name');

      if (farmers.length === 0) {
        console.log(`No farmers found near ${location.name}`);
        return;
      }

      // Send alerts to all farmers in the location
      const result = await WeatherAlertService.sendLocationBasedAlerts(
        location.lat,
        location.lon,
        weatherData,
        50 // 50km radius
      );

      console.log(`Automatic weather alerts sent for ${location.name}:`, result);

    } catch (error) {
      console.error(`Error sending automatic alerts for ${location.name}:`, error);
    }
  }
}

// Start the scheduler when this file is imported
if (process.env.NODE_ENV !== 'test') {
  WeatherAlertScheduler.start();
}

export default WeatherAlertScheduler;
