import type { RouteObject } from "react-router-dom";

import ProtectedLayout from "../layout/ProtectedLayout/ProtectedLayout";

import RoleProtectedRoute from "./RoleBasedProtectedRoute";
import Dashboard from "../pages/DashBoard/dashboard";
import Profile from "../pages/Profile/profile";
import Jobs from "../pages/Jobs/Jobs";
import JobDetails from "../pages/Jobs/JobDetail";
import RecruiterJobs from "../pages/Recruiter/RecruiterJob";
import CreateJob from "../pages/Recruiter/CreateJob";
import RecruiterApplications from "../pages/RecruiterApplication/RecruiterApplication";
import MyApplications from "../pages/MyApplications/MyApplications";
import ResumeAnalyzer from "../pages/ResumeAnalyzer/ResumeAnalyzer";

const ProtectedRoutes: RouteObject[] = [
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE", "RECRUITER"]}>
            <Dashboard />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE", "RECRUITER"]}>
            <Profile />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE"]}>
            <Jobs />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE"]}>
            <Jobs />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/jobs/:jobId",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE"]}>
            <JobDetails />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/recruiter/jobs",
        element: (
          <RoleProtectedRoute allowedRoles={["RECRUITER"]}>
            <RecruiterJobs />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/recruiter/jobs/create",
        element: (
          <RoleProtectedRoute allowedRoles={["RECRUITER"]}>
            <CreateJob />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/recruiter/jobs/:jobId/applications",
        element: (
          <RoleProtectedRoute allowedRoles={["RECRUITER"]}>
            <RecruiterApplications />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/my-applications",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE"]}>
            <MyApplications />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/resume-analyzer",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE"]}>
            <ResumeAnalyzer />
          </RoleProtectedRoute>
        ),
      },
    ],
  },
];

export default ProtectedRoutes;
