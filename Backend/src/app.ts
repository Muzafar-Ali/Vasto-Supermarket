import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import config from "./config/confiq.js";
import helmet from "helmet";
import { connectDB } from "./config/connectDB.js";
import v1Routes from "./routes/v1/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();


app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet({
  crossOriginResourcePolicy: false
}))
app.use(morgan("dev"));

// Home route
app.get("/", (req, res) => {
  res.send("Vasto Supermarket says Hello!");
});

app.use("/api/v1", v1Routes)

// Error middleware 
app.use(errorHandler);

app.listen(config.port, () => {
  connectDB();
  console.log(`Server is running on port ${config.port}`);
});