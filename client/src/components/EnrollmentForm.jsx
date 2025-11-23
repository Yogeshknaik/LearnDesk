// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Select, SelectItem } from "./ui/select";

// const levels = [
//   "Basic",
//   "Basic + Lab work",
//   "Intermediate",
//   "Intermediate + Lab work",
//   "Advanced",
//   "Advanced + Lab work",
// ];

// const sessionTypes = ["Online Session", "Classroom Session", "Hybrid Session"];

// const roles = [
//   "I am the mentor tutoring this learning program",
//   "I am a learner on this learning program",
// ];

// const EnrollmentForm = ({ user, course, onSubmit }) => {
//   const [form, setForm] = useState({
//     employeeId: user?.employeeId || "",
//     employeeName: user?.name || "",
//     email: user?.email || "",
//     department: user?.competency || "",
//     courseTitle: course?.courseTitle || "",
//     sessionTopic: "",
//     sessionType: sessionTypes[0],
//     level: levels[0],
//     hours: "",
//     role: roles[1],
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSelect = (name, value) => {
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (onSubmit) onSubmit(form);
//   };

//   return (
//     <form className="space-y-4" onSubmit={handleSubmit}>
//       <Input
//         label="Employee ID"
//         name="employeeId"
//         value={form.employeeId}
//         disabled
//       />
//       <Input
//         label="Employee Name"
//         name="employeeName"
//         value={form.employeeName}
//         disabled
//       />
//       <Input
//         label="Visionet Email ID"
//         name="email"
//         value={form.email}
//         disabled
//       />
//       <Input
//         label="Department / Competency"
//         name="department"
//         value={form.department}
//         disabled
//       />
//       <Input
//         label="Course Title"
//         name="courseTitle"
//         value={form.courseTitle}
//         disabled
//       />
//       <Input
//         label="Session topic"
//         name="sessionTopic"
//         value={form.sessionTopic}
//         onChange={handleChange}
//         required
//       />
//       <Select
//         value={form.sessionType}
//         onValueChange={(v) => handleSelect("sessionType", v)}
//       >
//         {sessionTypes.map((type) => (
//           <SelectItem key={type} value={type}>
//             {type}
//           </SelectItem>
//         ))}
//       </Select>
//       <Select
//         value={form.level}
//         onValueChange={(v) => handleSelect("level", v)}
//       >
//         {levels.map((level) => (
//           <SelectItem key={level} value={level}>
//             {level}
//           </SelectItem>
//         ))}
//       </Select>
//       <Input
//         label="Number of hours attended"
//         name="hours"
//         value={form.hours}
//         onChange={handleChange}
//         type="number"
//         step="0.1"
//         min="0"
//         required
//       />
//       <Select value={form.role} onValueChange={(v) => handleSelect("role", v)}>
//         {roles.map((role) => (
//           <SelectItem key={role} value={role}>
//             {role}
//           </SelectItem>
//         ))}
//       </Select>
//       <Button type="submit" className="w-full">
//         Submit
//       </Button>
//     </form>
//   );
// };

// export default EnrollmentForm;
