import { Request, Response, NextFunction } from 'express';
import connectDB from './config/db';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { uploadStaticLogger, uploadDebugRouter, uploadsPath } from './middleware/upload';
import { createServer } from 'http';
import indexRoutes from './routes/indexRoutes';
import createDefaultAdmin from './config/createDefaultAdmin';
import { initializeSocket } from './services/socketService';
import './jobs/autoConfirmPurchases';
import './jobs/weatherAlertScheduler';


dotenv.config();

const app = express();
const httpServer = createServer(app);

// Enhanced CORS configuration


// Connect to MongoDB and initialize Socket.IO after successful connection
connectDB()
  .then(() => {
    initializeSocket(httpServer); // Initialize Socket.IO *after* DB connection
    createDefaultAdmin(); // Create default admin once DB is connected
  })
const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5175'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Accept', 'X-Requested-With'],
  exposedHeaders: ['Authorization', 'x-auth-token'],
};


app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // Removed this line to fix error

// Middleware
app.use(express.json());

app.use(passport.initialize());

app.use('/uploads', uploadStaticLogger);

// Use upload debug router for debug endpoints
// Routes
app.use('/api', indexRoutes);

// Use upload debug router for debug endpoints
app.use('/api', uploadDebugRouter);

// Serve static files from the uploads directory
app.use('/api/uploads', express.static(uploadsPath));

// Add error handling middleware as the last middleware
import { errorHandler } from './middleware/errorHandler';
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
