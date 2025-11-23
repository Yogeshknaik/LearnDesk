import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const EmployeeAnalytics = ({ learningForms = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter forms based on search term and date range
  const filteredForms = learningForms.filter((form) => {
    const matchesSearch =
      form.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const formDate = new Date(form.createdAt);
    const matchesDateRange =
      (!startDate || formDate >= new Date(startDate)) &&
      (!endDate || formDate <= new Date(endDate));

    return matchesSearch && matchesDateRange;
  });

  // Sort the filtered forms
  const sortedForms = [...filteredForms].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "employeeId":
        return a.employeeId.localeCompare(b.employeeId);
      case "hours":
        return b.hoursAttended - a.hoursAttended;
      default:
        return 0;
    }
  });

  // Calculate statistics
  const totalHours = filteredForms.reduce(
    (sum, form) => sum + parseFloat(form.hoursAttended),
    0
  );
  const totalEmployees = new Set(filteredForms.map((form) => form.employeeId))
    .size;
  const totalCourses = new Set(filteredForms.map((form) => form.courseTitle))
    .size;

  // Prepare chart data
  const levelChartData = Array.from(
    filteredForms.reduce((acc, form) => {
      acc.set(form.levelOfLearning, (acc.get(form.levelOfLearning) || 0) + 1);
      return acc;
    }, new Map())
  ).map(([name, count]) => ({ name, count }));

  const sessionChartData = Array.from(
    filteredForms.reduce((acc, form) => {
      acc.set(form.sessionType, (acc.get(form.sessionType) || 0) + 1);
      return acc;
    }, new Map())
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by Employee ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-96"
        />
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="md:w-48"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="md:w-48"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="employeeId">Sort by Employee ID</SelectItem>
            <SelectItem value="hours">Sort by Hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Total Learning Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {totalHours.toFixed(1)}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Active Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {totalEmployees}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{totalCourses}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Level Distribution Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Learning Level Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={levelChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Session Type Distribution */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Session Type Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sessionChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {sessionChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Learning Submissions Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Learning Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Employee ID</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Course</th>
                  <th className="text-left p-2">Level</th>
                  <th className="text-left p-2">Hours</th>
                  <th className="text-left p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {sortedForms.map((form, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{form.employeeId}</td>
                    <td className="p-2">{form.employeeName}</td>
                    <td className="p-2">{form.courseTitle}</td>
                    <td className="p-2">{form.levelOfLearning}</td>
                    <td className="p-2">{form.hoursAttended}</td>
                    <td className="p-2">
                      {new Date(form.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeAnalytics;
