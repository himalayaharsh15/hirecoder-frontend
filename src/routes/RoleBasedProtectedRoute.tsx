import { Navigate } from "react-router-dom";

import type { UserRole } from "../features/auth/type";

import { useAppSelector } from "../App/hook";

interface RoleProtectedRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

const RoleProtectedRoute = ({
  allowedRoles,
  children,
}: RoleProtectedRouteProps) => {
  const {
    user,
    isAuthenticated,
    isAuthInitialized, // 🔥 NEW
  } = useAppSelector((state) => state.auth);

  console.log("Protected Route:", {
    user,
    isAuthenticated,
    isAuthInitialized,
  });

  // 🔥 IMPORTANT:
  // Do NOT redirect to login while the application
  // is still restoring authentication.
  if (!isAuthInitialized) {
    return <div className="auth-initializer">Loading...</div>;
  }

  // 🔄 Existing authentication check
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Existing role check
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
