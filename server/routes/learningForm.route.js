// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import {
//   getMyLearningForms,
//   getAllLearningForms,
//   createLearningForm,
// } from "../controllers/learningForm.controller.js";

// const router = express.Router();

// router.get("/my", isAuthenticated, getMyLearningForms);
// router.get("/all", isAuthenticated, getAllLearningForms);
// router.post("/create", isAuthenticated,createLearningForm);
// export default router;

// routes/learningForm.routes.js
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getMyLearningForms,
  getAllLearningForms,
  createLearningForm,
  getTopLearnersOfMonth,
  getTopLearnersOfWeek,
} from "../controllers/learningForm.controller.js";

const router = express.Router();

router.get("/my", isAuthenticated, getMyLearningForms);
router.get("/all", isAuthenticated, getAllLearningForms);
router.post("/create", isAuthenticated, createLearningForm);
router.get("/top-month", isAuthenticated, getTopLearnersOfMonth);
router.get("/top-week", isAuthenticated, getTopLearnersOfWeek);

export default router;
