import { Request, Response, NextFunction } from 'express';
import connectDB from './config/db';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { uploadStaticLogger, uploadDebugRouter, uploadsPath } from './middleware/upload';
import { createServer } from 'http';
import indexRoutes from './routes/indexRoutes';
import createDefaultAdmin from './config/createDefaultAdmin';
import { initializeSocket } from './services/socketService';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Connect to MongoDB
connectDB().then(() => {
  createDefaultAdmin(); // Create default admin once DB is connected
});

// Initialize Socket.IO
initializeSocket(httpServer);

// Enhanced CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Accept', 'X-Requested-With'],
  exposedHeaders: ['Authorization', 'x-auth-token'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());

// Removed redundant console.log of uploadsPath as it is imported from upload module

app.use('/uploads', uploadStaticLogger);

// Use upload debug router for debug endpoints
// Routes
app.use('/api', indexRoutes);

// Use upload debug router for debug endpoints
app.use('/api', uploadDebugRouter);

// Serve static files from the uploads directory
app.use('/api/uploads', express.static(uploadsPath));

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;