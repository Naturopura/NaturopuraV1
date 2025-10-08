import express from 'express';
import { applyInsurance, getMyInsurance, getAllInsurances, updateInsuranceStatus } from '../controllers/insuranceController';
import { authenticateToken} from '../middleware/auth';
import { isAdmin } from '../middleware/roleCheck';

const router = express.Router();

router.post('/apply', authenticateToken, applyInsurance);
router.get('/my', authenticateToken,  getMyInsurance);
router.get('/all', authenticateToken, getAllInsurances);
router.put('/:id/status', authenticateToken,isAdmin, updateInsuranceStatus);

export default router;
