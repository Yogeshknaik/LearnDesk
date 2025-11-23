import { API_ENDPOINTS } from "@/config/constants";
import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_ASSIGNED_COURSE_URL;

const AssignCourse = () => {
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    competency: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);
  const [tableSearch, setTableSearch] = useState("");

  useEffect(() => {
    fetchAssignments();
    fetchUsers();
  }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/all`, { withCredentials: true });
      setAssignments(res.data.courses || []);
    } catch (err) {
      alert("Failed to fetch assignments");
    }
    setLoading(false);
  };

  const fetchUsers = async (competency = "") => {
    try {
      const res = await axios.get(
        `${API_ENDPOINTS.EMPLOYEES}${
          competency ? `?competency=${competency}` : ""
        }`,
        { withCredentials: true }
      );
      setUsers(res.data.users || []);
    } catch (err) {
      setUsers([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "competency") {
      fetchUsers(e.target.value);
      setForm((prev) => ({ ...prev, employeeId: "" }));
    }
    if (e.target.name === "employeeId") {
      setForm((prev) => ({ ...prev, competency: "" }));
    }
  };

  // Table filter: filter assignments by employeeId, name, competency, or course
  const filteredAssignments = assignments.filter((a) => {
    const user = users.find((u) => u.employeeId === a.employeeId);
    const name = user?.name || "";
    return (
      a.employeeId.includes(tableSearch) ||
      name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      a.competency.toLowerCase().includes(tableSearch.toLowerCase()) ||
      a.course.toLowerCase().includes(tableSearch.toLowerCase())
    );
  });

  const handleAssign = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/assign`, form, { withCredentials: true });
      fetchAssignments();
      setForm({ employeeId: "", competency: "", course: "" });
      alert("Course assigned!");
    } catch (err) {
      alert("Failed to assign course");
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assign Course</h2>
      <form
        onSubmit={handleAssign}
        className="mb-6 flex flex-col gap-4 max-w-xl"
      >
        <div>
          <label className="block mb-1">Employee ID (optional)</label>
          <input
            type="text"
            name="employeeId"
            value={form.employeeId}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            list="employee-suggestions"
            disabled={!!form.competency}
            placeholder="Type to search Employee ID or Name"
            autoComplete="off"
          />
          <datalist id="employee-suggestions">
            {users.map((u) => (
              <option key={u.employeeId} value={u.employeeId}>
                {u.employeeId} - {u.name}
              </option>
            ))}
          </datalist>
        </div>
        <div>
          <label className="block mb-1">Competency (optional)</label>
          <select
            name="competency"
            value={form.competency}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            disabled={!!form.employeeId}
          >
            <option value="">Select Competency</option>
            <option value="CNEX">CNEX</option>
            <option value="Data">Data</option>
            <option value="Testing">Testing</option>
            <option value="Automation">Automation</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Course</label>
          <input
            name="course"
            value={form.course}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Assigning..." : "Assign Course"}
        </button>
      </form>
      <h3 className="text-xl font-semibold mb-2">Assigned Courses</h3>
      <div className="mb-4">
        <label className="block mb-1">Search Employee</label>
        <input
          value={tableSearch}
          onChange={(e) => setTableSearch(e.target.value)}
          placeholder="Search by Employee ID, Name, Competency, or Course"
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Employee ID</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Competency</th>
              <th className="border px-2 py-1">Course</th>
              <th className="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.map((a) => {
              const user = users.find((u) => u.employeeId === a.employeeId);
              return (
                <tr key={a._id}>
                  <td className="border px-2 py-1">{a.employeeId}</td>
                  <td className="border px-2 py-1">{user?.name || ""}</td>
                  <td className="border px-2 py-1">{a.competency}</td>
                  <td className="border px-2 py-1">{a.course}</td>
                  <td className="border px-2 py-1">{a.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignCourse;
