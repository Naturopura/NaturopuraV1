import express from 'express';
import { body } from 'express-validator';
import WeatherAlertController from '../controllers/weatherAlertController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

/**
 * @route POST /api/weather-alerts/user
 * @desc Send weather alert to current authenticated user
 * @access Private (Farmers only)
 */
router.post('/user', [
  body('temp').isNumeric().withMessage('Temperature must be a number'),
  body('humidity').isNumeric().withMessage('Humidity must be a number'),
  body('windSpeed').isNumeric().withMessage('Wind speed must be a number'),
  body('pressure').isNumeric().withMessage('Pressure must be a number'),
  body('weatherMain').notEmpty().withMessage('Weather main condition is required'),
  body('weatherDescription').optional().isString().withMessage('Weather description must be a string')
], WeatherAlertController.sendUserAlert);

/**
 * @route POST /api/weather-alerts/location
 * @desc Send weather alerts to all farmers in a specific location
 * @access Private (Admin/System only)
 */
router.post('/location', [
  body('latitude').isNumeric().withMessage('Latitude must be a number'),
  body('longitude').isNumeric().withMessage('Longitude must be a number'),
  body('temp').isNumeric().withMessage('Temperature must be a number'),
  body('humidity').isNumeric().withMessage('Humidity must be a number'),
  body('windSpeed').isNumeric().withMessage('Wind speed must be a number'),
  body('pressure').isNumeric().withMessage('Pressure must be a number'),
  body('weatherMain').notEmpty().withMessage('Weather main condition is required'),
  body('weatherDescription').optional().isString().withMessage('Weather description must be a string'),
  body('radiusKm').optional().isNumeric().withMessage('Radius must be a number')
], WeatherAlertController.sendLocationAlerts);

/**
 * @route POST /api/weather-alerts/analyze
 * @desc Analyze weather data and return alerts without sending SMS
 * @access Private
 */
router.post('/analyze', [
  body('temp').isNumeric().withMessage('Temperature must be a number'),
  body('humidity').isNumeric().withMessage('Humidity must be a number'),
  body('windSpeed').isNumeric().withMessage('Wind speed must be a number'),
  body('pressure').isNumeric().withMessage('Pressure must be a number'),
  body('weatherMain').notEmpty().withMessage('Weather main condition is required'),
  body('weatherDescription').optional().isString().withMessage('Weather description must be a string')
], WeatherAlertController.analyzeWeather);

/**
 * @route GET /api/weather-alerts/config
 * @desc Get weather alert thresholds and configuration
 * @access Private
 */
router.get('/config', WeatherAlertController.getAlertConfig);

export default router;
