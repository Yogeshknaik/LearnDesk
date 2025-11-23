import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetLearningFormsQuery } from "@/features/api/learningFormApi";
import { useState } from "react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "@/components/ThemeProvider";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, FileDown, Users } from "lucide-react";
import StatsCard from "@/components/common/StatsCard";
import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import TopLearnersCard from "@/components/TopLearnersCard/TopLearnersCard";
import useTopLearners from "@/hooks/useTopLearners";
import AssignCourse from "./AssignCourse";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
const DARK_COLORS = ["#8884d8", "#83a598", "#8ec07c", "#fe8019", "#d3869b"];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [dateRange, setDateRange] = useState([null, null]);
  const [activeSection, setActiveSection] = useState("overview");
  const { theme } = useTheme();
  const {
    data,
    isLoading: isFormsLoading,
    isError,
  } = useGetLearningFormsQuery();
  const {
    topLearnersOfWeek,
    topLearnersOfMonth,
    isLoading: isTopLearnersLoading,
    error: topLearnersError,
  } = useTopLearners();

  if (isFormsLoading || isTopLearnersLoading) return <h1>Loading...</h1>;
  if (isError || topLearnersError)
    return (
      <h1 className="text-red-500 dark:text-red-400">Failed to fetch data</h1>
    );

  const forms = data?.forms || [];

  // Filter forms based on search term and date range
  const filteredForms = forms.filter((form) => {
    const matchesSearch =
      form.employeeId.includes(searchTerm) ||
      form.employeeName.toLowerCase().includes(searchTerm.toLowerCase());

    const formDate = new Date(form.createdAt);
    const matchesDateRange =
      (!dateRange[0] || formDate >= dateRange[0]) &&
      (!dateRange[1] || formDate <= dateRange[1]);

    return matchesSearch && matchesDateRange;
  });

  // Sort forms
  const sortedForms = [...filteredForms].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === "employeeId") {
      return a.employeeId.localeCompare(b.employeeId);
    }
    if (sortBy === "hours") {
      return b.hoursAttended - a.hoursAttended;
    }
    return 0;
  });

  // Calculate statistics
  const totalHours = forms.reduce((sum, form) => sum + form.hoursAttended, 0);
  const totalEmployees = new Set(forms.map((form) => form.employeeId)).size;
  const totalCourses = new Set(forms.map((form) => form.courseTitle)).size;

  // Prepare chart data
  const courseCompletions = forms.reduce((acc, form) => {
    if (!acc[form.courseTitle]) {
      acc[form.courseTitle] = 1;
    } else {
      acc[form.courseTitle]++;
    }
    return acc;
  }, {});

  const courseData = Object.entries(courseCompletions).map(([name, value]) => ({
    name: name.length > 20 ? name.substring(0, 20) + "..." : name,
    value,
  }));

  const levelData = forms.reduce((acc, form) => {
    if (!acc[form.levelOfLearning]) {
      acc[form.levelOfLearning] = 1;
    } else {
      acc[form.levelOfLearning]++;
    }
    return acc;
  }, {});

  const levelChartData = Object.entries(levelData).map(([name, count]) => ({
    name,
    count,
  }));

  // Determine which color palette to use based on theme
  const colors = theme === "dark" ? DARK_COLORS : COLORS;

  // Function to export data to Excel
  const exportToExcel = () => {
    // Prepare the data for export
    const exportData = sortedForms.map((form) => ({
      "Employee ID": form.employeeId,
      Name: form.employeeName,
      Course: form.courseTitle,
      Level: form.levelOfLearning,
      Hours: form.hoursAttended,
      Date: new Date(form.createdAt).toLocaleDateString(),
    }));

    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Data");

    // Generate Excel file and download it
    XLSX.writeFile(workbook, "EmployeeData.xlsx");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-screen w-64 transition-transform ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-r shadow-lg`}
      >
        <nav className="p-4 space-y-2">
          {["overview", "employeeData", "assignCourse", "topLearners"].map(
            (section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === section
                    ? "bg-blue-600 text-white"
                    : theme === "dark"
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {section.charAt(0).toUpperCase() +
                  section.slice(1).replace(/([A-Z])/g, " $1")}
              </button>
            )
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pl-64 pt-0 pr-10">
        <div className="p-0">
          {activeSection === "overview" && (
            <div className="space-y-6">
              <PageHeader
                title="Dashboard Overview"
                description="Key metrics and statistics"
              />

              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <StatsCard
                  title="Total Learning Hours"
                  value={totalHours.toFixed(1)}
                  icon={Clock}
                  colorClass="text-blue-600 dark:text-blue-400"
                />
                <StatsCard
                  title="Active Employees"
                  value={totalEmployees}
                  icon={Users}
                  colorClass="text-green-600 dark:text-green-400"
                />
                <StatsCard
                  title="Total Courses"
                  value={totalCourses}
                  icon={BookOpen}
                  colorClass="text-purple-600 dark:text-purple-400"
                />
              </div>

              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className={theme === "dark" ? "text-white" : ""}>
                      Course Completions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={courseData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {courseData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={colors[index % colors.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={
                            theme === "dark"
                              ? {
                                  backgroundColor: "#374151",
                                  borderColor: "#4b5563",
                                }
                              : {}
                          }
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className={theme === "dark" ? "text-white" : ""}>
                      Learning Levels Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={levelChartData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={theme === "dark" ? "#4b5563" : "#e2e8f0"}
                        />
                        <XAxis
                          dataKey="name"
                          stroke={theme === "dark" ? "#d1d5db" : "#4b5563"}
                        />
                        <YAxis
                          stroke={theme === "dark" ? "#d1d5db" : "#4b5563"}
                        />
                        <Tooltip
                          contentStyle={
                            theme === "dark"
                              ? {
                                  backgroundColor: "#374151",
                                  borderColor: "#4b5563",
                                }
                              : {}
                          }
                        />
                        <Bar
                          dataKey="count"
                          fill={theme === "dark" ? "#8884d8" : "#8884d8"}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === "employeeData" && (
            <div className="space-y-6">
              <PageHeader
                title="Employee Data"
                description="View and manage employee learning records"
              />

              <div className="flex flex-col md:flex-row gap-4 items-center">
                <Input
                  placeholder="Search by Employee ID or Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="md:w-96"
                />

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Sort by Date</SelectItem>
                    <SelectItem value="employeeId">
                      Sort by Employee ID
                    </SelectItem>
                    <SelectItem value="hours">Sort by Hours</SelectItem>
                  </SelectContent>
                </Select>

                <DatePicker
                  selectsRange={true}
                  startDate={dateRange[0]}
                  endDate={dateRange[1]}
                  onChange={setDateRange}
                  isClearable={true}
                  placeholderText="Select date range"
                  className="w-60 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={exportToExcel}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Export to Excel
                </Button>
              </div>

              <DataTable
                columns={[
                  { key: "employeeId", header: "E-ID" },
                  { key: "employeeName", header: "Name" },
                  { key: "courseTitle", header: "Course" },
                  { key: "sessionTopic", header: "Topic" },
                  { key: "levelOfLearning", header: "Level" },
                  { key: "hoursAttended", header: "Hours" },
                  {
                    key: "createdAt",
                    header: "Date",
                    render: (row) =>
                      new Date(row.createdAt).toLocaleDateString(),
                  },
                ]}
                data={sortedForms}
                className="mt-4"
              />
            </div>
          )}

          {activeSection === "topLearners" && (
            <div className="space-y-6">
              <PageHeader
                title="Top Learners"
                description="Recognizing our most active learners"
              />

              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <TopLearnersCard
                  title="Top Learners This Week"
                  learners={topLearnersOfWeek}
                />
                <TopLearnersCard
                  title="Top Learners This Month"
                  learners={topLearnersOfMonth}
                />
              </div>
            </div>
          )}

          {activeSection === "assignCourse" && <AssignCourse />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
