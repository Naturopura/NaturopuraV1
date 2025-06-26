import express from 'express';
import * as droneController from '../controllers/droneScheduleController';

const router = express.Router();

// Route to schedule a drone flight
router.post('/schedule', droneController.scheduleDroneFlight);

// Route to get schedules by farmerId
router.get('/farmer/:farmerId', droneController.getSchedulesByFarmer);

// Route to get all schedules
router.get('/', droneController.getAllSchedules);

// Route to update schedule status
router.put('/:id/status', droneController.updateScheduleStatus);

export default router;
