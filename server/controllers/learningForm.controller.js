
import { LearningForm } from "../models/learningForm.model.js";
import { User } from "../models/user.model.js";

export const createLearningForm = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    const {
      courseTitle,
      sessionTopic,
      sessionType,
      levelOfLearning,
      hoursAttended,
      role,
    } = req.body;

    const form = await LearningForm.create({
      employeeId: user.employeeId,
      employeeName: user.name,
      visionetEmail: user.email,
      competency: user.competency,
      courseTitle,
      sessionTopic,
      sessionType,
      levelOfLearning,
      hoursAttended: parseFloat(hoursAttended),
      role,
    });

    res.status(201).json({ success: true, form });
  } catch (error) {
    console.error("Error creating learning form:", error);
    res.status(500).json({ success: false, message: "Failed to submit form" });
  }
};

// Get all learning forms for the logged-in employee
export const getMyLearningForms = async (req, res) => {
  console.log("called all learnings" + req.headers.employeeid);
  try {
    const forms = await LearningForm.find({
      employeeId: req.headers.employeeid,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, forms });
  } catch (error) {
    console.error("Error fetching learning forms:", error);
    res.status(500).json({ success: false, message: "Failed to fetch forms" });
  }
};

// Get all forms (admin only)
export const getAllLearningForms = async (req, res) => {
  try {
    const forms = await LearningForm.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, forms });
  } catch (error) {
    console.error("Error fetching all forms:", error);
    res.status(500).json({ success: false, message: "Failed to fetch forms" });
  }
};

// Get top learners of the month
export const getTopLearnersOfMonth = async (req, res) => {
  try {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );

    const topLearners = await LearningForm.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: "$employeeId",
          employeeName: { $first: "$employeeName" },
          competency: { $first: "$competency" },
          totalHours: { $sum: "$hoursAttended" },
        },
      },
      {
        $sort: { totalHours: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({ success: true, topLearners });
  } catch (error) {
    console.error("Error fetching top learners of the month:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch top learners" });
  }
};

// Get top learners of the week
export const getTopLearnersOfWeek = async (req, res) => {
  console.log("called top learners of the month");
  try {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date();
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);

    const topLearners = await LearningForm.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        },
      },
      {
        $group: {
          _id: "$employeeId",
          employeeName: { $first: "$employeeName" },
          competency: { $first: "$competency" },
          totalHours: { $sum: "$hoursAttended" },
        },
      },
      {
        $sort: { totalHours: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({ success: true, topLearners });
  } catch (error) {
    console.error("Error fetching top learners of the week:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch top learners" });
  }
};
