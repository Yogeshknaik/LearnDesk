import mongoose from "mongoose";

const assignedCourseSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
    },
    competency: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const AssignedCourse = mongoose.model(
  "AssignedCourse",
  assignedCourseSchema
);
