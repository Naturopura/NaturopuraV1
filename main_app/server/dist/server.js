"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const upload_1 = require("./middleware/upload");
const http_1 = require("http");
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const createDefaultAdmin_1 = __importDefault(require("./config/createDefaultAdmin"));
const socketService_1 = require("./services/socketService");
require("./jobs/autoConfirmPurchases");
require("./jobs/weatherAlertScheduler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// Enhanced CORS configuration
// Connect to MongoDB and initialize Socket.IO after successful connection
(0, db_1.default)()
    .then(() => {
    (0, socketService_1.initializeSocket)(httpServer); // Initialize Socket.IO *after* DB connection
    (0, createDefaultAdmin_1.default)(); // Create default admin once DB is connected
});
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5175'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Accept', 'X-Requested-With'],
    exposedHeaders: ['Authorization', 'x-auth-token'],
};
app.use((0, cors_1.default)(corsOptions));
// app.options('*', cors(corsOptions)); // Removed this line to fix error
// Middleware
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use('/uploads', upload_1.uploadStaticLogger);
// Use upload debug router for debug endpoints
// Routes
app.use('/api', indexRoutes_1.default);
// Use upload debug router for debug endpoints
app.use('/api', upload_1.uploadDebugRouter);
// Serve static files from the uploads directory
app.use('/api/uploads', express_1.default.static(upload_1.uploadsPath));
// Add error handling middleware as the last middleware
const errorHandler_1 = require("./middleware/errorHandler");
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
