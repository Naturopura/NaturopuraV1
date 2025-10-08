"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const weatherAlertController_1 = __importDefault(require("../controllers/weatherAlertController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Apply authentication middleware to all routes
router.use(auth_1.authenticateToken);
/**
 * @route POST /api/weather-alerts/user
 * @desc Send weather alert to current authenticated user
 * @access Private (Farmers only)
 */
router.post('/user', [
    (0, express_validator_1.body)('temp').isNumeric().withMessage('Temperature must be a number'),
    (0, express_validator_1.body)('humidity').isNumeric().withMessage('Humidity must be a number'),
    (0, express_validator_1.body)('windSpeed').isNumeric().withMessage('Wind speed must be a number'),
    (0, express_validator_1.body)('pressure').isNumeric().withMessage('Pressure must be a number'),
    (0, express_validator_1.body)('weatherMain').notEmpty().withMessage('Weather main condition is required'),
    (0, express_validator_1.body)('weatherDescription').optional().isString().withMessage('Weather description must be a string')
], weatherAlertController_1.default.sendUserAlert);
/**
 * @route POST /api/weather-alerts/location
 * @desc Send weather alerts to all farmers in a specific location
 * @access Private (Admin/System only)
 */
router.post('/location', [
    (0, express_validator_1.body)('latitude').isNumeric().withMessage('Latitude must be a number'),
    (0, express_validator_1.body)('longitude').isNumeric().withMessage('Longitude must be a number'),
    (0, express_validator_1.body)('temp').isNumeric().withMessage('Temperature must be a number'),
    (0, express_validator_1.body)('humidity').isNumeric().withMessage('Humidity must be a number'),
    (0, express_validator_1.body)('windSpeed').isNumeric().withMessage('Wind speed must be a number'),
    (0, express_validator_1.body)('pressure').isNumeric().withMessage('Pressure must be a number'),
    (0, express_validator_1.body)('weatherMain').notEmpty().withMessage('Weather main condition is required'),
    (0, express_validator_1.body)('weatherDescription').optional().isString().withMessage('Weather description must be a string'),
    (0, express_validator_1.body)('radiusKm').optional().isNumeric().withMessage('Radius must be a number')
], weatherAlertController_1.default.sendLocationAlerts);
/**
 * @route POST /api/weather-alerts/analyze
 * @desc Analyze weather data and return alerts without sending SMS
 * @access Private
 */
router.post('/analyze', [
    (0, express_validator_1.body)('temp').isNumeric().withMessage('Temperature must be a number'),
    (0, express_validator_1.body)('humidity').isNumeric().withMessage('Humidity must be a number'),
    (0, express_validator_1.body)('windSpeed').isNumeric().withMessage('Wind speed must be a number'),
    (0, express_validator_1.body)('pressure').isNumeric().withMessage('Pressure must be a number'),
    (0, express_validator_1.body)('weatherMain').notEmpty().withMessage('Weather main condition is required'),
    (0, express_validator_1.body)('weatherDescription').optional().isString().withMessage('Weather description must be a string')
], weatherAlertController_1.default.analyzeWeather);
/**
 * @route GET /api/weather-alerts/config
 * @desc Get weather alert thresholds and configuration
 * @access Private
 */
router.get('/config', weatherAlertController_1.default.getAlertConfig);
exports.default = router;
