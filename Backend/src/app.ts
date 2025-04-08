import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import config from "./config/confiq.js";
import helmet from "helmet";
import { connectDB } from "./config/connectDB.js";
import v1Routes from "./routes/v1/index.js";
import stripeWebhookRoutes from './routes/v1/stripeWebhook.routes.js';

import { errorHandler } from "./middlewares/error.middleware.js";

// Swagger documentation imports
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs"; // For loading YAML files

const app = express();

/// Load OpenAPI specification from YAML file
const swaggerDocument = YAML.load("./openapi.yaml");

app.use(cors({
  origin: "*",
  credentials: true
}));

// Stripe webhook route must come before express.json() middleware
// to access the raw request body
app.use("/api/v1/stripe", stripeWebhookRoutes)

app.use(express.json());
app.use(cookieParser());
app.use(helmet({
  crossOriginResourcePolicy: false // Disable for file downloads if needed
}));
app.use(morgan("dev"));

// Swagger documentation route
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home route
app.get("/", (req, res) => {
  res.send("Vasto Supermarket says Hello!");
});

app.use("/api/v1", v1Routes)

// Global error handling middleware
app.use(errorHandler);

app.listen(config.port, () => {
  connectDB();
  console.log(`Server is running on port ${config.port}`);
});