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
exports.WeatherAlertController = void 0;
const weatherAlertService_1 = __importDefault(require("../services/weatherAlertService"));
class WeatherAlertController {
    /**
     * Send weather alert to current user
     */
    static sendUserAlert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
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
                const weatherData = {
                    temp: parseFloat(temp),
                    humidity: parseFloat(humidity),
                    windSpeed: parseFloat(windSpeed),
                    pressure: parseFloat(pressure),
                    weatherMain,
                    weatherDescription: weatherDescription || ''
                };
                const alertSent = yield weatherAlertService_1.default.sendUserAlert(userId, weatherData);
                if (alertSent) {
                    res.json({
                        message: 'Weather alert sent successfully',
                        alerts: weatherAlertService_1.default.analyzeWeather(weatherData)
                    });
                }
                else {
                    res.json({
                        message: 'No weather alerts to send',
                        alerts: []
                    });
                }
            }
            catch (error) {
                console.error('Error sending user weather alert:', error);
                res.status(500).json({
                    message: 'Failed to send weather alert',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
    }
    /**
     * Send weather alerts to all farmers in a location
     */
    static sendLocationAlerts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { latitude, longitude, temp, humidity, windSpeed, pressure, weatherMain, weatherDescription, radiusKm } = req.body;
                if (!latitude || !longitude || !temp || !humidity || !windSpeed || !pressure || !weatherMain) {
                    res.status(400).json({
                        message: 'Missing required fields: latitude, longitude, and weather data'
                    });
                    return;
                }
                const weatherData = {
                    temp: parseFloat(temp),
                    humidity: parseFloat(humidity),
                    windSpeed: parseFloat(windSpeed),
                    pressure: parseFloat(pressure),
                    weatherMain,
                    weatherDescription: weatherDescription || ''
                };
                const result = yield weatherAlertService_1.default.sendLocationBasedAlerts(parseFloat(latitude), parseFloat(longitude), weatherData, radiusKm ? parseFloat(radiusKm) : 50);
                res.json({
                    message: 'Location-based weather alerts sent',
                    result,
                    alerts: weatherAlertService_1.default.analyzeWeather(weatherData)
                });
            }
            catch (error) {
                console.error('Error sending location-based weather alerts:', error);
                res.status(500).json({
                    message: 'Failed to send location-based weather alerts',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
    }
    /**
     * Analyze weather data and return alerts without sending SMS
     */
    static analyzeWeather(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { temp, humidity, windSpeed, pressure, weatherMain, weatherDescription } = req.body;
                if (!temp || !humidity || !windSpeed || !pressure || !weatherMain) {
                    res.status(400).json({
                        message: 'Missing required weather data fields'
                    });
                    return;
                }
                const weatherData = {
                    temp: parseFloat(temp),
                    humidity: parseFloat(humidity),
                    windSpeed: parseFloat(windSpeed),
                    pressure: parseFloat(pressure),
                    weatherMain,
                    weatherDescription: weatherDescription || ''
                };
                const alerts = weatherAlertService_1.default.analyzeWeather(weatherData);
                const shouldSend = weatherAlertService_1.default.shouldSendAlert(weatherData);
                res.json({
                    alerts,
                    shouldSend,
                    weatherData
                });
            }
            catch (error) {
                console.error('Error analyzing weather data:', error);
                res.status(500).json({
                    message: 'Failed to analyze weather data',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
    }
    /**
     * Get weather alert thresholds and configuration
     */
    static getAlertConfig(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (error) {
                console.error('Error getting alert configuration:', error);
                res.status(500).json({
                    message: 'Failed to get alert configuration',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
    }
}
exports.WeatherAlertController = WeatherAlertController;
exports.default = WeatherAlertController;
