"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const features_1 = require("./utils/features");
const api_1 = __importDefault(require("./routes/api"));
const dotenv_1 = require("dotenv");
const userSideRoutes_1 = __importDefault(require("./routes/userSideRoutes"));
const farmerProducts_1 = __importDefault(require("./routes/farmerProducts"));
const farmerOrders_1 = __importDefault(require("./routes/farmerOrders"));
(0, dotenv_1.config)({
    path: "./.env",
});
const mongoURI = process.env.MONGODB_URI || "";
// Connect to MongoDB
(0, features_1.connectDB)(mongoURI);
const app = (0, express_1.default)();
// Middleware to handle CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
// Security and logging middleware
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
// Body parsing middleware
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Increase payload size in Express.js
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
// Enable CORS for all routes
app.use((0, cors_1.default)());
// Basic route for testing
// app.get("/", (req: Request, res: Response) => {
//   res.send("API Working fine");
// });
// Use API router for authentication
app.use("/auth", api_1.default);
// app.use('/api',farmerUploadImageRoute)
app.use("/auth", farmerProducts_1.default);
app.use("/auth", userSideRoutes_1.default);
app.use("/auth", farmerOrders_1.default);
app.use("/images", express_1.default.static("images"));
// Set the port and start the server
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});
