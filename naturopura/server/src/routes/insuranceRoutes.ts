import express from 'express';
import { applyInsurance, getMyInsurance, getAllInsurances, updateInsuranceStatus } from '../controllers/insuranceController';
import { authenticate} from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/roleCheck';

const router = express.Router();

router.post('/apply', authenticate, applyInsurance);
router.get('/my', authenticate,  getMyInsurance);
router.get('/all', authenticate, getAllInsurances);
router.put('/:id/status', authenticate,isAdmin, updateInsuranceStatus);

export default router;
