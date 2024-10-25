import express from 'express';
import  listProduct  from '../controllers/listProduct.controller'; 
// import { uploadUserImage } from '../middlewares/multer.js'; // Middleware for handling image uploads
// import { authenticateToken } from '../middleware/authenticateToken.js'; 

const router = express.Router();

// Route to upload an image
router.post('/listproduct', listProduct);

export default router;
