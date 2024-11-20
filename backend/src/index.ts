import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./utils/features";
import apiRouter from "./routes/api";
import { config } from "dotenv";
import userSideRoutes from "./routes/userSideRoutes";
// import {farmerUploadImageRoute} from "./routes/farmerUploadImage";
import productRouter from "./routes/farmerProducts";
// Load environment variables from .env file
config({
  path: "./.env",
});

const mongoURI = process.env.MONGODB_URI || "";

// Connect to MongoDB
connectDB(mongoURI);

const app = express();

// Middleware to handle CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Security and logging middleware
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// Body parsing middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
// Increase payload size in Express.js

// app.use(express.json()); // This line can be kept or removed if bodyParser is used

// Enable CORS for all routes
app.use(cors());

// Basic route for testing
app.get("/", (req: Request, res: Response) => {
  res.send("API Working fine");
});

// Use API router for authentication
app.use("/auth", apiRouter);
// app.use('/api',farmerUploadImageRoute)
app.use("/auth", productRouter);
app.use("/auth", userSideRoutes);

// Set the port and start the server
const port = Number(process.env.PORT) || 3001;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
