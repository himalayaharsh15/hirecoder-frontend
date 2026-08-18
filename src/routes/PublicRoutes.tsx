import type { RouteObject } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout/PublicLayout";

import Landing from "../pages/landing/landing";
import LoginPage from "../pages/Login/loging";
import RegisterPage from "../pages/Register/register";
import ResumeAnalyzer from "../pages/ResumeAnalyzer/ResumeAnalyzer";

const PublicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/resume-analyzer",
        element: <ResumeAnalyzer />,
      },
    ],
  },
];

export default PublicRoutes;
