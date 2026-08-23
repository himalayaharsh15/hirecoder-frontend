import {
  PsychologyOutlined,
  RecordVoiceOverOutlined,
  SmartToyOutlined,
} from "@mui/icons-material";

const HeroVisual = () => {
  return (
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

                <p>I found 12 jobs that match your experience and skills.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
