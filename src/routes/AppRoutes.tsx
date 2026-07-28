import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/landing/landing";
import LoginPage from "../pages/Login/loging";
import RegisterPage from "../pages/Register/register";
import DashboardPage from "../pages/DashBoard/dashboard";
import PublicLayout from "../layout/PublicLayout/PublicLayout";
import ResumeAnalyzer from "../pages/ResumeAnalyzer/ResumeAnalyzer";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected Routes (We'll implement later) */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
      </Routes>
    </BrowserRouter>
  );
}
