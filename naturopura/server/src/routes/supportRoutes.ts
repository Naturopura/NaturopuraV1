// routes/supportRoutes.ts
import express from 'express';
import { sendSupportMessage } from '../controllers/supportController';

const router = express.Router();

// Anyone can send a support message; no auth middleware here
router.post('/', sendSupportMessage);

export default router;