"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { uploadImageController } from '../controllers/uploadImageController.js'; 
// import { uploadUserImage } from '../middlewares/multer.js'; // Middleware for handling image uploads
// import { authenticateToken } from '../middleware/authenticateToken.js'; 
const router = express_1.default.Router();
// Route to upload an image
// router.post('/uploadImage', authenticateToken, uploadUserImage, uploadImageController);
exports.default = router;
