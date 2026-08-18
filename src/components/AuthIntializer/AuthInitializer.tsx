import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../../App/store";

import {
  setCredentials,
  setAuthInitialized,
  logout,
} from "../../features/auth/authSlice";

import { useRefreshTokenMutation } from "../../features/auth/authApi";

import "./AuthInitializer.scss";
import { useAppSelector } from "../../App/hook";

interface AuthInitializerProps {
  children: React.ReactNode;
}

const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // 🔥 NEW:
  // Used to get a new access token after browser refresh.
  const [refreshToken, { isLoading }] = useRefreshTokenMutation();

  // 🔥 NEW:
  // Read whether authentication initialization
  // has completed from Redux.
  const isAuthInitialized = useAppSelector(
    (state) => state.auth.isAuthInitialized,
  );

  useEffect(() => {
    const restoreAuthentication = async () => {
      // 🔥 Get refresh token saved during login.
      const storedRefreshToken = localStorage.getItem("refreshToken");

      // No refresh token means there is no existing session.
      if (!storedRefreshToken) {
        dispatch(setAuthInitialized(true));
        return;
      }

      try {
        // 🔥 Ask backend for a new access token.
        const response = await refreshToken({
          refreshToken: storedRefreshToken,
        }).unwrap();

        // 🔥 Restore user + access token into Redux.
        dispatch(
          setCredentials({
            user: response.user,
            accessToken: response.accessToken,
          }),
        );

        // 🔥 Save new refresh token if backend rotates it.
        if (response.refreshToken) {
          localStorage.setItem("refreshToken", response.refreshToken);
        }
      } catch (error) {
        console.error("Failed to restore authentication:", error);

        // 🔥 Refresh token is invalid/expired.
        localStorage.removeItem("refreshToken");

        dispatch(logout());
      } finally {
        // 🔥 Authentication check is complete.
        dispatch(setAuthInitialized(true));
      }
    };

    restoreAuthentication();
  }, [dispatch, refreshToken]);

  // 🔥 IMPORTANT:
  // Don't render the application until authentication
  // restoration has completed.
  if (!isAuthInitialized || isLoading) {
    return (
      <div className="auth-initializer">
        <CircularProgress />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthInitializer;
