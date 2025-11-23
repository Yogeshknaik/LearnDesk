import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import { ThemeProvider } from "./components/ThemeProvider";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import Profile from "./components/Profile";
import EmployeeAssignedCoursesPage from "./pages/employee/EmployeeAssignedCoursesPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "assigned-courses",
        element: (
          <ProtectedRoute>
            <EmployeeAssignedCoursesPage />
          </ProtectedRoute>
        ),
      },

      // admin routes start from here
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
