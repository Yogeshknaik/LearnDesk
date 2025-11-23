import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/db.js";
import learningFormRoute from "./routes/learningForm.route.js";
import userRoute from "./routes/user.route.js";
import assignedCourseRoute from "./routes/assignedCourse.route.js";

dotenv.config({});

// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/learning-form", learningFormRoute);
app.use("/api/v1/assigned-course", assignedCourseRoute);

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
