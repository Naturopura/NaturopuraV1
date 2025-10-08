import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { getVendorEquipments, addVendorEquipment, updateVendorEquipment, deleteVendorEquipment } from '../controllers/equipmentController';

const router = express.Router();

// All routes here require vendor authentication
router.use(authenticateToken);

router.get('/equipments', getVendorEquipments);
router.post('/equipments/add', addVendorEquipment);
router.put('/equipments/:id', updateVendorEquipment);
router.delete('/equipments/:id', deleteVendorEquipment);

export default router;
