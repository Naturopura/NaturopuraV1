import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import {
  createStore,
  getStore,
  getStores,
  updateStore,
  deleteStore
} from '../controllers/storeController';

const router = express.Router();

router.post('/', authenticate, createStore);
router.get('/', authenticate, getStores);
router.get('/:id', authenticate, getStore);
router.put('/:id', authenticate, updateStore);
router.delete('/:id', authenticate, deleteStore);

export default router;
