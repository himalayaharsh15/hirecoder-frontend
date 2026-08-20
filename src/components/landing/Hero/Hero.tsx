import {
  ArrowForward,
  AutoAwesome,
  CheckCircleOutlined,
  PsychologyOutlined,
  RecordVoiceOverOutlined,
  SmartToyOutlined,
} from "@mui/icons-material";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./Hero.scss";
import { useAppSelector } from "../../../App/hook";

const Hero = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleGetStarted = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <section className="hero">
      {/* ================================================== */}
      {/* BACKGROUND */}
      {/* ================================================== */}

      <div className="hero__background-glow hero__background-glow--one" />

      <div className="hero__background-glow hero__background-glow--two" />

      <div className="hero__container">
        {/* ================================================== */}
        {/* LEFT CONTENT */}
        {/* ================================================== */}

        <div className="hero__content">
          <div className="hero__tag">
            <AutoAwesome />
            AI Career Assistant
            <span>New</span>
          </div>

          {/* ================================================== */}
          {/* TITLE */}
          {/* ================================================== */}

          <h1 className="hero__title">
            {isAuthenticated ? (
              <>
                Welcome back.
                <br />
                <span className="hero__title-muted">
                  Let's move your career
                </span>
                <br />
                <span className="hero__highlight">forward with AI.</span>
              </>
            ) : (
              <>
                Your career.
                <br />
                <span className="hero__title-muted">Your next move.</span>
                <br />
                <span className="hero__highlight">Powered by AI.</span>
              </>
            )}
          </h1>

          {/* ================================================== */}
          {/* DESCRIPTION */}
          {/* ================================================== */}

          <p className="hero__description">
            {isAuthenticated
              ? "Continue improving your resume, discover better opportunities, prepare for interviews, and manage your entire job search with HireCoder AI."
              : "Build a stronger resume, discover better opportunities, write personalized applications, and practice interviews with an AI career assistant built for your job search."}
          </p>

          {/* ================================================== */}
          {/* ACTIONS */}
          {/* ================================================== */}

          <div className="hero__actions">
            {isAuthenticated ? (
              <Button
                variant="contained"
                size="large"
                onClick={handleDashboard}
                endIcon={<ArrowForward />}
                className="hero__primary-button"
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  endIcon={<ArrowForward />}
                  className="hero__primary-button"
                >
                  Get Started — It's Free
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleLogin}
                  className="hero__secondary-button"
                >
                  Sign In
                </Button>
              </>
            )}
          </div>

          {/* ================================================== */}
          {/* TRUST POINTS */}
          {/* ================================================== */}

          <div className="hero__trust">
            <div className="hero__trust-item">
              <CheckCircleOutlined />

              <span>AI-powered tools</span>
            </div>

            <div className="hero__trust-item">
              <CheckCircleOutlined />

              <span>Personalized for you</span>
            </div>

            <div className="hero__trust-item">
              <CheckCircleOutlined />

              <span>Built for modern hiring</span>
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* PRODUCT PREVIEW */}
        {/* ================================================== */}

        <div className="hero__visual">
          <div className="hero__visual-glow" />

          <div className="hero__dashboard">
            {/* ================================================== */}
            {/* WINDOW HEADER */}
            {/* ================================================== */}

            <div className="hero__dashboard-header">
              <div className="hero__window-controls">
                <span />
                <span />
                <span />
              </div>

              <div className="hero__dashboard-title">HireCoder AI</div>
            </div>

            {/* ================================================== */}
            {/* DASHBOARD */}
            {/* ================================================== */}

            <div className="hero__dashboard-body">
              {/* ================================================== */}
              {/* SIDEBAR */}
              {/* ================================================== */}

              <div className="hero__dashboard-sidebar">
                <div className="hero__sidebar-logo">HC</div>

                <div className="hero__sidebar-item active">Overview</div>

                <div className="hero__sidebar-item">Resume</div>

                <div className="hero__sidebar-item">Jobs</div>

                <div className="hero__sidebar-item">Interview</div>
              </div>

              {/* ================================================== */}
              {/* MAIN */}
              {/* ================================================== */}

              <div className="hero__dashboard-main">
                <div className="hero__welcome">
                  <span>AI Career Assistant</span>

                  <strong>Your career at a glance</strong>
                </div>

                {/* ================================================== */}
                {/* ATS SCORE */}
                {/* ================================================== */}

                <div className="hero__score-card">
                  <div className="hero__score-info">
                    <small>Resume ATS Score</small>

                    <strong>
                      87
                      <span>/100</span>
                    </strong>

                    <p>Excellent match for your target roles</p>
                  </div>

                  <div className="hero__score-circle">87%</div>
                </div>

                {/* ================================================== */}
                {/* MINI CARDS */}
                {/* ================================================== */}

                <div className="hero__mini-grid">
                  <div className="hero__mini-card">
                    <div className="hero__mini-icon">
                      <PsychologyOutlined />
                    </div>

                    <strong>Resume AI</strong>

                    <span>3 improvements</span>
                  </div>

                  <div className="hero__mini-card">
                    <div className="hero__mini-icon">
                      <RecordVoiceOverOutlined />
                    </div>

                    <strong>Interview Prep</strong>

                    <span>Ready to practice</span>
                  </div>
                </div>

                {/* ================================================== */}
                {/* AI MESSAGE */}
                {/* ================================================== */}

                <div className="hero__ai-message">
                  <div className="hero__ai-avatar">
                    <SmartToyOutlined />
                  </div>

                  <div>
                    <strong>AI Career Assistant</strong>

                    <p>
                      I found 12 jobs that match your experience and skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
