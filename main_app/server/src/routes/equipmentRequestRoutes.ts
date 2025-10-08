import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { getMyRequests } from '../controllers/equipmentRequestController';
import { createEquipmentRequest } from '../controllers/equipmentRequestController';

const router = express.Router();

router.use(authenticateToken);

router.get('/my-requests', getMyRequests);
router.post('/', createEquipmentRequest);

export default router;
