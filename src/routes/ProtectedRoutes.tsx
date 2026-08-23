import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedLayout from "../layout/ProtectedLayout/ProtectedLayout";
import RoleProtectedRoute from "./RoleBasedProtectedRoute";

const Dashboard = lazy(() => import("../pages/DashBoard/dashboard"));
const Profile = lazy(() => import("../pages/Profile/profile"));

const Jobs = lazy(() => import("../pages/Jobs/Jobs"));
const JobDetails = lazy(() => import("../pages/Jobs/JobDetail"));

const RecruiterJobs = lazy(() => import("../pages/Recruiter/RecruiterJob"));

const CreateJob = lazy(() => import("../pages/Recruiter/CreateJob"));

const RecruiterApplications = lazy(
  () => import("../pages/RecruiterApplication/RecruiterApplication"),
);

const MyApplications = lazy(
  () => import("../pages/MyApplications/MyApplications"),
);

const ResumeAnalyzer = lazy(
  () => import("../pages/ResumeAnalyzer/ResumeAnalyzer"),
);

const InterviewSessionPage = lazy(
  () => import("../components/InterviewPrep/InterviewSessionPage"),
);

const InterviewPrepPage = lazy(
  () => import("../components/InterviewPrep/InterviewPrep"),
);

const ProtectedRoutes: RouteObject[] = [
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE", "RECRUITER"]}>
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          </RoleProtectedRoute>
        ),
      },

      {
        path: "/profile",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE", "RECRUITER"]}>
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          </RoleProtectedRoute>
        ),
      },

      {
        path: "/jobs",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE"]}>
            <Suspense fallback={<div>Loading...</div>}>
              <Jobs />
            </Suspense>
          </RoleProtectedRoute>
        ),
      },

      {
        path: "/jobs/:jobId",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE"]}>
            <Suspense fallback={<div>Loading...</div>}>
              <JobDetails />
            </Suspense>
          </RoleProtectedRoute>
        ),
      },

      {
        path: "/recruiter/jobs",
        element: (
          <RoleProtectedRoute allowedRoles={["RECRUITER"]}>
            <Suspense fallback={<div>Loading...</div>}>
              <RecruiterJobs />
            </Suspense>
          </RoleProtectedRoute>
        ),
      },

      {
        path: "/recruiter/jobs/create",
        element: (
          <RoleProtectedRoute allowedRoles={["RECRUITER"]}>
            <Suspense fallback={<div>Loading...</div>}>
              <CreateJob />
            </Suspense>
          </RoleProtectedRoute>
        ),
      },

      {
        path: "/recruiter/jobs/:jobId/applications",
        element: (
          <RoleProtectedRoute allowedRoles={["RECRUITER"]}>
            <Suspense fallback={<div>Loading...</div>}>
              <RecruiterApplications />
            </Suspense>
          </RoleProtectedRoute>
        ),
      },

      {
        path: "/my-applications",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE"]}>
            <Suspense fallback={<div>Loading...</div>}>
              <MyApplications />
            </Suspense>
          </RoleProtectedRoute>
        ),
      },

      {
        path: "/resume-analyzer",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE"]}>
            <Suspense fallback={<div>Loading...</div>}>
              <ResumeAnalyzer />
            </Suspense>
          </RoleProtectedRoute>
        ),
      },

      {
        path: "/interview-prep",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE"]}>
            <Suspense fallback={<div>Loading...</div>}>
              <InterviewPrepPage />
            </Suspense>
          </RoleProtectedRoute>
        ),
      },

      {
        path: "/interview-session/:jobId",
        element: (
          <RoleProtectedRoute allowedRoles={["CANDIDATE"]}>
            <Suspense fallback={<div>Loading...</div>}>
              <InterviewSessionPage />
            </Suspense>
          </RoleProtectedRoute>
        ),
      },
    ],
  },
];

export default ProtectedRoutes;
