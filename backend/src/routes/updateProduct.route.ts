import express from 'express';
import  updateProduct  from '../controllers/updateProduct.controller'; 
// import { uploadUserImage } from '../middlewares/multer.js'; // Middleware for handling image uploads
// import { authenticateToken } from '../middleware/authenticateToken.js'; 

const router = express.Router();

router.post('/updateProduct', updateProduct);

export default router;
