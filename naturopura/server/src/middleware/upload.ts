import { Request, Response, NextFunction, Router } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

const uploadsPath = path.join(__dirname, '..', '..', 'uploads');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads', 'products');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    console.log('Saving file:', uniqueName);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Middleware for enhanced static file serving with detailed logging
function uploadStaticLogger(req: Request, _res: Response, next: NextFunction) {
  const fullPath = path.join(uploadsPath, req.url);
  console.log('Static file request:', {
    url: req.url,
    fullPath,
    exists: fs.existsSync(fullPath),
    isFile: fs.existsSync(fullPath) ? fs.statSync(fullPath).isFile() : false,
    timestamp: new Date().toISOString()
  });
  next();
}

// Middleware to handle product image upload using multer
function handleProductUpload(req: Request, res: Response, next: NextFunction) {
  const uploadSingle = upload.array('images', 5); // Assuming max 5 images per product
  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      return res.status(500).json({ success: false, message: 'File upload failed' });
    }
    next();
  });
}

// Debug endpoints related to uploads
router.get('/check-file/:filename', (req: Request, res: Response) => {
  const filePath = path.join(uploadsPath, 'products', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.json({ exists: true, path: filePath });
  } else {
    res.json({ exists: false, path: filePath });
  }
});

router.get('/debug/uploads', (_req, res) => {
  try {
    const productsPath = path.join(uploadsPath, 'products');
    const files = fs.existsSync(productsPath) 
      ? fs.readdirSync(productsPath)
      : [];
    
    res.json({
      uploadsPath,
      productsPath,
      files: files.map(file => ({
        name: file,
        path: `/uploads/products/${file}`,
        fullPath: path.join(productsPath, file),
        exists: fs.existsSync(path.join(productsPath, file))
      }))
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

router.get('/debug/file/:filename', (req, res) => {
  const filePath = path.join(uploadsPath, 'products', req.params.filename);
  res.json({
    exists: fs.existsSync(filePath),
    path: filePath,
    stats: fs.existsSync(filePath) ? fs.statSync(filePath) : null
  });
});

export {
  upload,
  uploadStaticLogger,
  handleProductUpload,
  router as uploadDebugRouter,
  uploadsPath,
  // Add handleEkycUpload middleware for eKYC file uploads
  handleEkycUpload
};

// Middleware to handle eKYC document uploads using multer
function handleEkycUpload(req: Request, res: Response, next: NextFunction) {
  const uploadFields = upload.fields([
    { name: 'aadhar', maxCount: 1 },
    { name: 'pan', maxCount: 1 },
    { name: 'selfie', maxCount: 1 }
  ]);
  uploadFields(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      return res.status(500).json({ success: false, message: 'File upload failed' });
    }
    next();
  });
}
