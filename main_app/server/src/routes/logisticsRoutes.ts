import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import {
  initializeLogistics,
  updateLogisticsStep,
  getLogisticsStatus
} from '../controllers/logisticsController';

const router = express.Router();

router.post('/initialize', authenticate, initializeLogistics);
router.put('/:productId/update', authenticate, updateLogisticsStep);
router.get('/:productId', authenticate, getLogisticsStatus);
router.put('/:productId/status', authenticate, updateLogisticsStep);

export default router;