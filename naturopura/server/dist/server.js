"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const upload_1 = require("./middleware/upload");
const http_1 = require("http");
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const createDefaultAdmin_1 = __importDefault(require("./config/createDefaultAdmin"));
const socketService_1 = require("./services/socketService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// Connect to MongoDB
(0, db_1.default)().then(() => {
    (0, createDefaultAdmin_1.default)(); // Create default admin once DB is connected
});
// Initialize Socket.IO
(0, socketService_1.initializeSocket)(httpServer);
// Enhanced CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Accept', 'X-Requested-With'],
    exposedHeaders: ['Authorization', 'x-auth-token'],
};
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions));
// Middleware
app.use(express_1.default.json());
// Removed redundant console.log of uploadsPath as it is imported from upload module
app.use('/uploads', upload_1.uploadStaticLogger);
// Use upload debug router for debug endpoints
// Routes
app.use('/api', indexRoutes_1.default);
// Use upload debug router for debug endpoints
app.use('/api', upload_1.uploadDebugRouter);
// Serve static files from the uploads directory
app.use('/api/uploads', express_1.default.static(upload_1.uploadsPath));
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
