import mongoose from "mongoose";

const learningFormSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  visionetEmail: { type: String, required: true },
  competency: { type: String, required: true },
  courseTitle: { type: String, required: true },
  sessionTopic: { type: String, required: true },
  sessionType: {
    type: String,
    enum: ["Online Session", "Classroom Session", "Hybrid Session"],
    required: true,
  },
  levelOfLearning: {
    type: String,
    enum: [
      "Basic",
      "Basic + Lab work",
      "Intermediate",
      "Intermediate + Lab work",
      "Advanced",
      "Advanced + Lab work",
    ],
    required: true,
  },
  hoursAttended: { type: Number, required: true },
  role: {
    type: String,
    enum: [
      "I am the mentor tutoring this program",
      "I am a learner on this program",
    ],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export const LearningForm = mongoose.model("LearningForm", learningFormSchema);
