import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { searchEquipments, getRequestStatuses, getAllEquipments } from '../controllers/equipmentSearchController';

const router = express.Router();

router.use(authenticateToken);

router.get('/search', searchEquipments);
router.get('/equipments', getAllEquipments);
router.post('/requests/status', getRequestStatuses);

export default router;
