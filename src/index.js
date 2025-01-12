import express from "express";
import jobsRouter from "./api/jobs.js";
import jobApplicationsRouter from "./api/jobApplications.js";
import "dotenv/config";
import { connectDB } from "./persistance/db.js";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware.js";
import cors from "cors";

const app = express();
app.use(express.json());

// Update CORS configuration
const allowedOrigins = ["http://localhost:5173", "https://hirelyai-site.netlify.app"];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // Allow cookies and headers like Authorization
  })
);

connectDB();

app.use("/api/jobs", jobsRouter);
app.use("/api/jobapplications", jobApplicationsRouter);

app.use(globalErrorHandlingMiddleware);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Webservice is listening on port ${PORT}`);
});
