import { AssignedCourse } from "../models/assignedCourse.model.js";
import { User } from "../models/user.model.js";

// Assign course to user(s) by employeeId or competency
export const assignCourse = async (req, res) => {
  try {
    const { employeeId, competency, course } = req.body;
    let users = [];
    if (employeeId) {
      const user = await User.findOne({ employeeId });
      if (user) users.push(user);
    } else if (competency) {
      users = await User.find({ competency });
    }
    if (!users.length) {
      return res
        .status(404)
        .json({ success: false, message: "No users found." });
    }
    const assignments = await Promise.all(
      users.map(async (user) => {
        return AssignedCourse.create({
          employeeId: user.employeeId,
          competency: user.competency,
          course,
          status: "pending",
        });
      })
    );
    res.json({ success: true, assignments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all assigned courses (admin view)
export const getAllAssignedCourses = async (req, res) => {
  try {
    const courses = await AssignedCourse.find();
    res.json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update course status (user marks as completed)
export const updateCourseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const course = await AssignedCourse.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found." });
    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
