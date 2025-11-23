import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import axios from "axios";

const sessionTypes = ["Online Session", "Classroom Session", "Hybrid Session"];
const learningLevels = [
  "Basic",
  "Basic + Lab work",
  "Intermediate",
  "Intermediate + Lab work",
  "Advanced",
  "Advanced + Lab work"
];
const roles = [
  { value: "Mentor", label: "I am the mentor tutoring this learning program" },
  { value: "Learner", label: "I am a learner on this learning program" }
];

const LearningForm = ({ user, onSubmit }) => {
  const [form, setForm] = useState({
    courseTitle: "",
    sessionTopic: "",
    sessionType: "",
    levelOfLearning: "",
    hoursAttended: "",
    role: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.courseTitle || !form.sessionTopic || !form.sessionType || !form.levelOfLearning || !form.hoursAttended || !form.role) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "/api/v1/learning-form",
        { ...form },
        { withCredentials: true }
      );
      toast.success("Learning form submitted!");
      setForm({
        courseTitle: "",
        sessionTopic: "",
        sessionType: "",
        levelOfLearning: "",
        hoursAttended: "",
        role: ""
      });
      if (onSubmit) onSubmit();
    } catch (err) {
      toast.error("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label>Employee ID</Label>
        <Input value={user.employeeId} disabled />
      </div>
      <div>
        <Label>Employee Name</Label>
        <Input value={user.name} disabled />
      </div>
      <div>
        <Label>Visionet Email ID</Label>
        <Input value={user.email} disabled />
      </div>
      <div>
        <Label>Department / Competency</Label>
        <Input value={user.competency} disabled />
      </div>
      <div>
        <Label>Course Title</Label>
        <Input name="courseTitle" value={form.courseTitle} onChange={handleChange} required />
      </div>
      <div>
        <Label>Session topic</Label>
        <Input name="sessionTopic" value={form.sessionTopic} onChange={handleChange} required />
      </div>
      <div>
        <Label>Online or Classroom Session?</Label>
        <Select value={form.sessionType} onValueChange={v => handleSelect("sessionType", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select session type" />
          </SelectTrigger>
          <SelectContent>
            {sessionTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Level of learning</Label>
        <Select value={form.levelOfLearning} onValueChange={v => handleSelect("levelOfLearning", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {learningLevels.map((level) => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Number of hours attended?</Label>
        <Input
          name="hoursAttended"
          type="number"
          min="0"
          step="0.1"
          value={form.hoursAttended}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Are you the mentor or the learner?</Label>
        <Select value={form.role} onValueChange={v => handleSelect("role", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((r) => (
              <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default LearningForm;
