import express from "express";
import {
  assignCourse,
  getAllAssignedCourses,
  updateCourseStatus,
} from "../controllers/assignedCourse.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Admin: assign course by employeeId or competency
router.post("/assign", isAuthenticated, assignCourse);
// Admin: get all assigned courses
router.get("/all", isAuthenticated, getAllAssignedCourses);
// User: update course status
router.patch("/:id/status", isAuthenticated, updateCourseStatus);

export default router;
