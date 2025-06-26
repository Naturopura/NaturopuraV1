"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsPath = exports.uploadDebugRouter = exports.upload = void 0;
exports.uploadStaticLogger = uploadStaticLogger;
exports.handleProductUpload = handleProductUpload;
exports.handleEkycUpload = handleEkycUpload;
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
exports.uploadDebugRouter = router;
const uploadsPath = path_1.default.join(__dirname, '..', '..', 'uploads');
exports.uploadsPath = uploadsPath;
// Configure multer for image uploads
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        const uploadsDir = path_1.default.join(__dirname, '..', '..', 'uploads', 'products');
        if (!fs_1.default.existsSync(uploadsDir)) {
            fs_1.default.mkdirSync(uploadsDir, { recursive: true });
        }
        cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
        const uniqueName = `${(0, uuid_1.v4)()}-${file.originalname}`;
        console.log('Saving file:', uniqueName);
        cb(null, uniqueName);
    }
});
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;
// Middleware for enhanced static file serving with detailed logging
function uploadStaticLogger(req, _res, next) {
    const fullPath = path_1.default.join(uploadsPath, req.url);
    console.log('Static file request:', {
        url: req.url,
        fullPath,
        exists: fs_1.default.existsSync(fullPath),
        isFile: fs_1.default.existsSync(fullPath) ? fs_1.default.statSync(fullPath).isFile() : false,
        timestamp: new Date().toISOString()
    });
    next();
}
// Middleware to handle product image upload using multer
function handleProductUpload(req, res, next) {
    const uploadSingle = upload.array('images', 5); // Assuming max 5 images per product
    uploadSingle(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError) {
            return res.status(400).json({ success: false, message: err.message });
        }
        else if (err) {
            return res.status(500).json({ success: false, message: 'File upload failed' });
        }
        next();
    });
}
// Debug endpoints related to uploads
router.get('/check-file/:filename', (req, res) => {
    const filePath = path_1.default.join(uploadsPath, 'products', req.params.filename);
    if (fs_1.default.existsSync(filePath)) {
        res.json({ exists: true, path: filePath });
    }
    else {
        res.json({ exists: false, path: filePath });
    }
});
router.get('/debug/uploads', (_req, res) => {
    try {
        const productsPath = path_1.default.join(uploadsPath, 'products');
        const files = fs_1.default.existsSync(productsPath)
            ? fs_1.default.readdirSync(productsPath)
            : [];
        res.json({
            uploadsPath,
            productsPath,
            files: files.map(file => ({
                name: file,
                path: `/uploads/products/${file}`,
                fullPath: path_1.default.join(productsPath, file),
                exists: fs_1.default.existsSync(path_1.default.join(productsPath, file))
            }))
        });
    }
    catch (error) {
        res.status(500).json({ error: String(error) });
    }
});
router.get('/debug/file/:filename', (req, res) => {
    const filePath = path_1.default.join(uploadsPath, 'products', req.params.filename);
    res.json({
        exists: fs_1.default.existsSync(filePath),
        path: filePath,
        stats: fs_1.default.existsSync(filePath) ? fs_1.default.statSync(filePath) : null
    });
});
// Middleware to handle eKYC document uploads using multer
function handleEkycUpload(req, res, next) {
    const uploadFields = upload.fields([
        { name: 'aadhar', maxCount: 1 },
        { name: 'pan', maxCount: 1 },
        { name: 'selfie', maxCount: 1 }
    ]);
    uploadFields(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError) {
            return res.status(400).json({ success: false, message: err.message });
        }
        else if (err) {
            return res.status(500).json({ success: false, message: 'File upload failed' });
        }
        next();
    });
}
