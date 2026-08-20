import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  ArrowForward,
  BookmarkBorderOutlined,
  BusinessCenterOutlined,
  DashboardOutlined,
  DescriptionOutlined,
  LogoutOutlined,
  Menu as MenuIcon,
  PersonOutlined,
  Search,
  SmartToyOutlined,
  Close as CloseIcon,
} from "@mui/icons-material";

import { useAppSelector } from "../../App/hook";

import { useLogoutMutation } from "../../features/auth/authApi";

import { logout } from "../../features/auth/authSlice";

import LogoutModal from "../logout/logoutModal";

import "./Navbar.scss";

const Navbar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [profileMenuAnchor, setProfileMenuAnchor] =
    useState<null | HTMLElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [logoutUser, { isLoading }] = useLogoutMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // ============================================================
  // ROLE
  // ============================================================

  const userRole = user?.role;

  const isCandidate = userRole === "CANDIDATE";

  const isRecruiter = userRole === "RECRUITER";

  // ============================================================
  // USER INFO
  // ============================================================

  const displayName = user?.name?.trim() || "Account";

  const userInitial = displayName.charAt(0).toUpperCase();

  // ============================================================
  // MOBILE MENU
  // ============================================================

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileNavigate = (path: string) => {
    setIsMobileMenuOpen(false);

    navigate(path);
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

      localStorage.removeItem("refreshToken");

      dispatch(logout());

      setIsLogoutModalOpen(false);

      setProfileMenuAnchor(null);

      setIsMobileMenuOpen(false);

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ============================================================
  // PROFILE MENU
  // ============================================================

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleDashboardNavigate = () => {
    handleProfileMenuClose();

    if (isRecruiter) {
      navigate("/recruiter/dashboard");

      return;
    }

    navigate("/dashboard");
  };

  const handleProfileNavigate = () => {
    handleProfileMenuClose();

    navigate("/profile");
  };

  const handleLogoutClick = () => {
    handleProfileMenuClose();

    setIsLogoutModalOpen(true);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      <AppBar position="sticky" elevation={0} className="navbar">
        <Toolbar className="navbar__toolbar">
          {/* ================================================== */}
          {/* LOGO */}
          {/* ================================================== */}

          <Typography component={Link} to="/" className="navbar__logo">
            <span className="navbar__logo-main">HireCoder</span>

            <span className="navbar__logo-ai">AI</span>
          </Typography>

          {/* ================================================== */}
          {/* DESKTOP NAVIGATION */}
          {/* ================================================== */}

          <Box className="navbar__menu">
            {/* HOME */}

            <Button component={Link} to="/" className="navbar__link">
              Home
            </Button>

            {/* ================================================= */}
            {/* PUBLIC */}
            {/* ================================================= */}

            {!isAuthenticated && (
              <>
                <Button
                  component={Link}
                  to="/jobs"
                  className="navbar__link"
                  startIcon={<Search />}
                >
                  Find Jobs
                </Button>

                <Button
                  component={Link}
                  to="/resume-analyzer"
                  className="navbar__ai-link"
                  startIcon={<SmartToyOutlined />}
                >
                  AI Resume Analyzer
                </Button>

                <Box className="navbar__auth">
                  <Button
                    component={Link}
                    to="/login"
                    className="navbar__login"
                  >
                    Login
                  </Button>

                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    className="navbar__register"
                  >
                    Get Started
                  </Button>
                </Box>
              </>
            )}

            {/* ================================================= */}
            {/* CANDIDATE */}
            {/* ================================================= */}

            {isAuthenticated && isCandidate && (
              <>
                <Button
                  component={Link}
                  to="/jobs"
                  className="navbar__link"
                  startIcon={<Search />}
                >
                  Find Jobs
                </Button>

                <Button
                  component={Link}
                  to="/my-applications"
                  className="navbar__link"
                  startIcon={<DescriptionOutlined />}
                >
                  Applications
                </Button>

                <Button
                  component={Link}
                  to="/jobs/saved"
                  className="navbar__link"
                  startIcon={<BookmarkBorderOutlined />}
                >
                  Saved Jobs
                </Button>

                <Button
                  component={Link}
                  to="/interview-prep"
                  className="navbar__ai-link"
                  startIcon={<SmartToyOutlined />}
                >
                  Interview Prep
                </Button>
              </>
            )}

            {/* ================================================= */}
            {/* RECRUITER */}
            {/* ================================================= */}

            {isAuthenticated && isRecruiter && (
              <>
                <Button
                  component={Link}
                  to="/recruiter/dashboard"
                  className="navbar__link"
                  startIcon={<DashboardOutlined />}
                >
                  Dashboard
                </Button>

                <Button
                  component={Link}
                  to="/recruiter/jobs"
                  className="navbar__link"
                  startIcon={<BusinessCenterOutlined />}
                >
                  My Jobs
                </Button>

                <Button
                  component={Link}
                  to="/recruiter/applications"
                  className="navbar__link"
                  startIcon={<DescriptionOutlined />}
                >
                  Applications
                </Button>

                <Button
                  component={Link}
                  to="/recruiter/jobs/create"
                  className="navbar__primary-action"
                >
                  Post a Job
                </Button>
              </>
            )}

            {/* ================================================= */}
            {/* ACCOUNT */}
            {/* ================================================= */}

            {isAuthenticated && (
              <Box className="navbar__account">
                <Button
                  className="navbar__account-button"
                  onClick={handleProfileMenuOpen}
                  endIcon={<span className="navbar__account-arrow">↓</span>}
                >
                  <span className="navbar__avatar">{userInitial}</span>

                  <span className="navbar__account-info">
                    <strong>{displayName}</strong>

                    <small>{isRecruiter ? "Recruiter" : "Candidate"}</small>
                  </span>
                </Button>
              </Box>
            )}
          </Box>

          {/* ================================================== */}
          {/* MOBILE MENU BUTTON */}
          {/* ================================================== */}

          <IconButton
            className="navbar__mobile-button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ====================================================== */}
      {/* DESKTOP ACCOUNT MENU */}
      {/* ====================================================== */}

      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        className="navbar__account-menu"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box className="navbar__menu-header">
          <div className="navbar__menu-avatar">{userInitial}</div>

          <div>
            <strong>{displayName}</strong>

            <span>{isRecruiter ? "Recruiter" : "Candidate"}</span>
          </div>
        </Box>

        <Divider />

        <MenuItem onClick={handleDashboardNavigate}>
          <DashboardOutlined />
          Dashboard
        </MenuItem>

        <MenuItem onClick={handleProfileNavigate}>
          <PersonOutlined />
          My Profile
        </MenuItem>

        {isCandidate && (
          <MenuItem
            onClick={() => {
              handleProfileMenuClose();

              navigate("/resume-analyzer");
            }}
          >
            <SmartToyOutlined />
            AI Resume Analyzer
          </MenuItem>
        )}

        {isRecruiter && (
          <MenuItem
            onClick={() => {
              handleProfileMenuClose();

              navigate("/recruiter/jobs/create");
            }}
          >
            <BusinessCenterOutlined />
            Post a Job
          </MenuItem>
        )}

        <Divider />

        <MenuItem
          onClick={handleLogoutClick}
          className="navbar__logout-menu-item"
        >
          <LogoutOutlined />
          Logout
        </MenuItem>
      </Menu>

      {/* ====================================================== */}
      {/* MOBILE DRAWER */}
      {/* ====================================================== */}

      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        className="navbar__mobile-drawer"
      >
        <div className="navbar__mobile-content">
          {/* ================================================== */}
          {/* MOBILE HEADER */}
          {/* ================================================== */}

          <div className="navbar__mobile-header">
            <Typography
              component={Link}
              to="/"
              onClick={handleMobileMenuClose}
              className="navbar__logo"
            >
              <span className="navbar__logo-main">HireCoder</span>

              <span className="navbar__logo-ai">AI</span>
            </Typography>

            <IconButton
              onClick={handleMobileMenuClose}
              aria-label="Close navigation"
            >
              <CloseIcon />
            </IconButton>
          </div>

          <Divider />

          {/* ================================================== */}
          {/* MOBILE USER */}
          {/* ================================================== */}

          {isAuthenticated && (
            <div className="navbar__mobile-user">
              <div className="navbar__menu-avatar">{userInitial}</div>

              <div>
                <strong>{displayName}</strong>

                <span>{isRecruiter ? "Recruiter" : "Candidate"}</span>
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* MOBILE NAVIGATION */}
          {/* ================================================== */}

          <nav className="navbar__mobile-nav">
            <button type="button" onClick={() => handleMobileNavigate("/")}>
              <span>
                <ArrowForward />
              </span>
              Home
            </button>

            {!isAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={() => handleMobileNavigate("/jobs")}
                >
                  <span>
                    <Search />
                  </span>
                  Find Jobs
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileNavigate("/resume-analyzer")}
                >
                  <span>
                    <SmartToyOutlined />
                  </span>
                  AI Resume Analyzer
                </button>
              </>
            )}

            {isAuthenticated && isCandidate && (
              <>
                <button
                  type="button"
                  onClick={() => handleMobileNavigate("/dashboard")}
                >
                  <span>
                    <DashboardOutlined />
                  </span>
                  Dashboard
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileNavigate("/jobs")}
                >
                  <span>
                    <Search />
                  </span>
                  Find Jobs
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileNavigate("/my-applications")}
                >
                  <span>
                    <DescriptionOutlined />
                  </span>
                  Applications
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileNavigate("/jobs/saved")}
                >
                  <span>
                    <BookmarkBorderOutlined />
                  </span>
                  Saved Jobs
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileNavigate("/interview-prep")}
                >
                  <span>
                    <SmartToyOutlined />
                  </span>
                  Interview Prep
                </button>
              </>
            )}

            {isAuthenticated && isRecruiter && (
              <>
                <button
                  type="button"
                  onClick={() => handleMobileNavigate("/recruiter/dashboard")}
                >
                  <span>
                    <DashboardOutlined />
                  </span>
                  Dashboard
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileNavigate("/recruiter/jobs")}
                >
                  <span>
                    <BusinessCenterOutlined />
                  </span>
                  My Jobs
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleMobileNavigate("/recruiter/applications")
                  }
                >
                  <span>
                    <DescriptionOutlined />
                  </span>
                  Applications
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileNavigate("/recruiter/jobs/create")}
                >
                  <span>
                    <BusinessCenterOutlined />
                  </span>
                  Post a Job
                </button>
              </>
            )}
          </nav>

          {/* ================================================== */}
          {/* ACCOUNT ACTIONS */}
          {/* ================================================== */}

          {isAuthenticated ? (
            <>
              <Divider />

              <div className="navbar__mobile-account">
                <button
                  type="button"
                  onClick={() => handleMobileNavigate("/profile")}
                >
                  <span>
                    <PersonOutlined />
                  </span>
                  My Profile
                </button>

                <button
                  type="button"
                  className="navbar__mobile-logout"
                  onClick={() => {
                    setIsMobileMenuOpen(false);

                    setIsLogoutModalOpen(true);
                  }}
                >
                  <span>
                    <LogoutOutlined />
                  </span>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="navbar__mobile-auth">
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleMobileNavigate("/login")}
              >
                Login
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={() => handleMobileNavigate("/register")}
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </Drawer>

      {/* ====================================================== */}
      {/* LOGOUT MODAL */}
      {/* ====================================================== */}

      <LogoutModal
        open={isLogoutModalOpen}
        isLoading={isLoading}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
