import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { isAdmin } from '../middleware/roleCheck';
import { getAllRequests, updateRequestStatus } from '../controllers/adminEquipmentRequestController';

const router = express.Router();

router.use(authenticateToken);
router.use(isAdmin);

router.get('/equipment-requests', getAllRequests);
router.put('/equipment-requests/:id/status', updateRequestStatus);

export default router;
