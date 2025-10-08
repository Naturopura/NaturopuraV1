"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherAlertScheduler = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const axios_1 = __importDefault(require("axios"));
const weatherAlertService_1 = __importDefault(require("../services/weatherAlertService"));
const User_1 = __importDefault(require("../models/User"));
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
class WeatherAlertScheduler {
    static start() {
        if (this.isRunning) {
            console.log('Weather alert scheduler is already running');
            return;
        }
        console.log('Starting weather alert scheduler...');
        node_cron_1.default.schedule(ALERT_THRESHOLDS.CHECK_INTERVAL, () => __awaiter(this, void 0, void 0, function* () {
            console.log('Checking weather conditions for automatic alerts...');
            try {
                yield this.checkWeatherForAllLocations();
            }
            catch (error) {
                console.error('Error in weather alert scheduler:', error);
            }
        }));
        this.isRunning = true;
        console.log('Weather alert scheduler started successfully');
    }
    static stop() {
        console.log('Stopping weather alert scheduler...');
        this.isRunning = false;
        console.log('Weather alert scheduler stopped');
    }
    static checkWeatherForAllLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const location of ALERT_THRESHOLDS.LOCATIONS) {
                try {
                    yield this.checkLocationWeather(location);
                }
                catch (error) {
                    console.error(`Error checking weather for ${location.name}:`, error);
                }
            }
        });
    }
    static checkLocationWeather(location) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield axios_1.default.get(WEATHER_API_URL, {
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
                    windSpeed: ((_a = response.data.wind) === null || _a === void 0 ? void 0 : _a.speed) || 0,
                    pressure: response.data.main.pressure,
                    weatherMain: response.data.weather[0].main,
                    weatherDescription: response.data.weather[0].description
                };
                // Check if conditions warrant automatic alerts
                const shouldSendAlert = this.shouldSendAutomaticAlert(weatherData);
                if (shouldSendAlert) {
                    console.log(`Automatic weather alert triggered for ${location.name}`);
                    yield this.sendAutomaticAlerts(location, weatherData);
                }
            }
            catch (error) {
                console.error(`Error fetching weather for ${location.name}:`, error);
            }
        });
    }
    static shouldSendAutomaticAlert(weatherData) {
        // Check for rainy weather
        const isRainy = ALERT_THRESHOLDS.RAINY_WEATHER.some(condition => weatherData.weatherMain.toLowerCase().includes(condition));
        // Check for hot weather
        const isHot = weatherData.temp >= ALERT_THRESHOLDS.HOT_TEMPERATURE;
        return isRainy || isHot;
    }
    static sendAutomaticAlerts(location, weatherData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find all farmers in the location
                const farmers = yield User_1.default.find({
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
                const result = yield weatherAlertService_1.default.sendLocationBasedAlerts(location.lat, location.lon, weatherData, 50 // 50km radius
                );
                console.log(`Automatic weather alerts sent for ${location.name}:`, result);
            }
            catch (error) {
                console.error(`Error sending automatic alerts for ${location.name}:`, error);
            }
        });
    }
}
exports.WeatherAlertScheduler = WeatherAlertScheduler;
WeatherAlertScheduler.isRunning = false;
// Start the scheduler when this file is imported
if (process.env.NODE_ENV !== 'test') {
    WeatherAlertScheduler.start();
}
exports.default = WeatherAlertScheduler;
