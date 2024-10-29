import express from 'express';
import  getProductsByFarmer  from '../controllers/getProduct.controller'; 
// import { uploadUserImage } from '../middlewares/multer.js'; // Middleware for handling image uploads
// import { authenticateToken } from '../middleware/authenticateToken.js'; 

const router = express.Router();

// Route to upload an image
router.post('/getProduct', getProductsByFarmer);

export default router;
