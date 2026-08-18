import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector } from "../../App/hook";

import "./Navbar.scss";
import { useLogoutMutation } from "../../features/auth/authApi";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import LogoutModal from "../logout/logoutModal";
import { useState } from "react";

const Navbar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [logoutUser, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

      // 🔥 NEW:
      // Remove the persisted refresh token.
      localStorage.removeItem("refreshToken");

      // Existing:
      // Clear Redux authentication state.
      dispatch(logout());

      setIsLogoutModalOpen(false);

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="navbar__toolbar">
        <Typography component={Link} to="/" className="navbar__logo">
          HireCoder AI
        </Typography>

        <Box className="navbar__menu">
          <Button component={Link} to="/" className="navbar__link">
            Home
          </Button>

          {!isAuthenticated && (
            <>
              <Button component={Link} to="/login" className="navbar__login">
                Login
              </Button>

              <Button
                component={Link}
                to="/register"
                variant="contained"
                className="navbar__register"
              >
                Register
              </Button>
            </>
          )}

          {isAuthenticated && (
            <>
              <Button component={Link} to="/dashboard" className="navbar__link">
                Dashboard
              </Button>

              <Button
                onClick={() => setIsLogoutModalOpen(true)}
                className="navbar__logout"
              >
                Logout
              </Button>
            </>
          )}

          <Button
            component={Link}
            to="/resume-analyzer"
            className="navbar__resume-analyzer"
          >
            Resume Analyzer
          </Button>

          <Button component={Link} to="/profile" className="navbar__link">
            Profile
          </Button>
        </Box>
      </Toolbar>
      <LogoutModal
        open={isLogoutModalOpen}
        isLoading={isLoading}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </AppBar>
  );
};

export default Navbar;
