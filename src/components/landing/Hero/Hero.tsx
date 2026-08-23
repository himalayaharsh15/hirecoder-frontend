import {
  ArrowForward,
  AutoAwesome,
  CheckCircleOutlined,
} from "@mui/icons-material";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./Hero.scss";
import { useAppSelector } from "../../../App/hook";
import { lazy, Suspense } from "react";

const Hero = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const HeroVisual = lazy(() => import("./HeroVisual"));

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
          <Suspense fallback={<div className="hero__visual-placeholder" />}>
            <HeroVisual />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Hero;
