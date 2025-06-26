import express from 'express';

import userRoutes from './userRoutes';
import loanRoutes from './loanRoutes';
import cropRoutes from './cropRoutes';
import productRoutes from './productRoutes';
import dashboardRoutes from './dashboardRoutes';
import ekycRoutes from './ekycRoutes';
import paymentRoutes from './paymentRoutes';
import subsidyRoutes from './subsidyRoutes';
import insuranceRoutes from './insuranceRoutes';
import motionEventRoutes from './motionEventRoutes';
import smsRoutes from './smsRoutes';
import feedbackRoutes from './feedbackRoutes';
import otpRoutes from './otpRoutes';
import supportRoutes from './supportRoutes';
import logisticRoutes from './logisticsRoutes';
import cartRoutes from './cartRoutes';
import adminRoutes from './adminRoutes';
import deliveryPartnerRoutes from './deliveryPartnerRoutes';
import droneScheduleRoutes from './droneScheduleRoutes';
import storeManagerRoutes from './storeManagerRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/loans', loanRoutes);
router.use('/crops', cropRoutes);
router.use('/products', productRoutes);
router.use('/admin/dashboard', dashboardRoutes);
router.use('/ekyc', ekycRoutes);
router.use('/payments', paymentRoutes);
router.use('/subsidy', subsidyRoutes);
router.use('/insurance', insuranceRoutes);
router.use('/motion', motionEventRoutes);
router.use('/notification', smsRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/otp', otpRoutes);
router.use('/support', supportRoutes);
router.use('/logistics', logisticRoutes);
router.use('/cart', cartRoutes);
router.use('/admin', adminRoutes);
router.use('/delivery-partner', deliveryPartnerRoutes);
router.use('/drone-schedules', droneScheduleRoutes);
router.use('/store-manager', storeManagerRoutes);

export default router;
