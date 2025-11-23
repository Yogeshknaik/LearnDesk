import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const API_BASE = import.meta.env.VITE_API_ASSIGNED_COURSE_URL;

const MyAssignedCourses = () => {
  const { user } = useSelector((state) => state.auth);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssignments();
    // eslint-disable-next-line
  }, [user]);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/all`, { withCredentials: true });
      // Filter only assignments for this user
      setAssignments(
        (res.data.courses || []).filter(
          (a) => a.employeeId === user?.employeeId
        )
      );
    } catch (err) {
      setAssignments([]);
    }
    setLoading(false);
  };

  const markCompleted = async (id) => {
    setLoading(true);
    try {
      await axios.patch(
        `${API_BASE}/${id}/status`,
        { status: "completed" },
        { withCredentials: true }
      );
      fetchAssignments();
    } catch (err) {
      alert("Failed to update status");
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Assigned Courses</h2>
      {loading && <div>Loading...</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Course</th>
              <th className="border px-2 py-1">Competency</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a._id}>
                <td className="border px-2 py-1">{a.course}</td>
                <td className="border px-2 py-1">{a.competency}</td>
                <td className="border px-2 py-1">{a.status}</td>
                <td className="border px-2 py-1">
                  {a.status === "pending" && (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => markCompleted(a._id)}
                      disabled={loading}
                    >
                      Mark as Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssignedCourses;
