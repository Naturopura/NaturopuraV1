import express from 'express';
import  deleteProduct  from '../controllers/deleteProduct.controller'; 
// import { uploadUserImage } from '../middlewares/multer.js'; // Middleware for handling image uploads
// import { authenticateToken } from '../middleware/authenticateToken.js'; 

const router = express.Router();


router.post('/deleteProduct', deleteProduct);

export default router;
