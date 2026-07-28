import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./Hero.scss";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <section className="hero">
      <div className="hero__content">
        <span className="hero__tag">AI Career Assistant</span>

        <h1 className="hero__title">
          Build. Apply.
          <br />
          Get Hired.
          <span className="hero__highlight"> Smarter with AI.</span>
        </h1>

        <p className="hero__description">
          Analyze your resume, boost your ATS score, generate personalized cover
          letters, and prepare for interviews using AI—all in one place.
        </p>

        <div className="hero__actions">
          <Button variant="contained" size="large" onClick={handleGetStarted}>
            Get Started
          </Button>

          <Button variant="outlined" size="large" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>

      <div className="hero__image">AI Illustration</div>
    </section>
  );
};

export default Hero;
