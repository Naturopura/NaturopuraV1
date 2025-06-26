import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { handleProductUpload } from '../middleware/upload';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  predictPrice
} from '../controllers/productController';

const router = express.Router();

// Price prediction route
router.get('/predict-price', authenticate, predictPrice);

// Product CRUD routes
router.get('/', getProducts);
router.post('/', authenticate, handleProductUpload, createProduct);
router.get('/:id', getProductById);
router.put('/:id', authenticate, handleProductUpload, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;
