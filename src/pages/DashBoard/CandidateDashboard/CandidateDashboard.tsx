import { useNavigate } from "react-router-dom";

import {
  ArrowForward,
  BookmarkBorder,
  BusinessCenterOutlined,
  CheckCircleOutlined,
  DescriptionOutlined,
  EventOutlined,
  PersonOutlined,
  Search,
  TrendingUp,
} from "@mui/icons-material";

import { Button } from "@mui/material";

import { useAppSelector } from "../../../App/hook";

import { useGetCandidateDashboardQuery } from "../../../features/candidate/candidateApi";

import "./CandidateDashboard.scss";
import CandidateDashboardSkeleton from "./CandidateDashboardSkeleton";

const CandidateDashboard = () => {
  const user = useAppSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const {
    data: dashboard,
    isLoading,
    isError,
  } = useGetCandidateDashboardQuery();

  const firstName = user?.name?.split(" ")[0] || "there";

  // ============================================================
  // LOADING
  // ============================================================

  if (isLoading) {
    return <CandidateDashboardSkeleton />;
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (isError || !dashboard) {
    return (
      <section className="candidate-dashboard">
        <div className="candidate-dashboard__error">
          <h2>Unable to load dashboard</h2>

          <p>Something went wrong while loading your dashboard.</p>

          <Button variant="contained" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  // ============================================================
  // DASHBOARD STATS
  // ============================================================

  const stats = [
    {
      label: "Applications",
      value: dashboard.stats.applications,
      icon: <DescriptionOutlined />,
      className: "applications",
      action: () => navigate("/my-applications"),
    },

    {
      label: "Interviews",
      value: dashboard.stats.interviews,
      icon: <EventOutlined />,
      className: "interviews",
      action: () => navigate("/interviews"),
    },

    {
      label: "Shortlisted",
      value: dashboard.stats.shortlisted,
      icon: <CheckCircleOutlined />,
      className: "shortlisted",
    },

    {
      label: "Saved Jobs",
      value: dashboard.stats.savedJobs,
      icon: <BookmarkBorder />,
      className: "saved",
      action: () => navigate("/jobs/saved"),
    },
  ];

  return (
    <section className="candidate-dashboard">
      <div className="candidate-dashboard__container">
        {/* ================================================== */}
        {/* WELCOME */}
        {/* ================================================== */}

        <section className="candidate-dashboard__welcome">
          <div className="candidate-dashboard__welcome-content">
            <div className="candidate-dashboard__eyebrow">
              <TrendingUp />

              <span>Your career dashboard</span>
            </div>

            <h1>Welcome back, {firstName}</h1>

            <p>
              Keep track of your applications, discover relevant opportunities
              and take the next step in your career.
            </p>

            <div className="candidate-dashboard__welcome-actions">
              <Button
                variant="contained"
                startIcon={<Search />}
                onClick={() => navigate("/jobs")}
              >
                Explore Jobs
              </Button>

              <Button
                variant="outlined"
                startIcon={<PersonOutlined />}
                onClick={() => navigate("/profile")}
              >
                View Profile
              </Button>
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* PROFILE VISUAL */}
          {/* ------------------------------------------------ */}

          <div className="candidate-dashboard__welcome-visual">
            <div className="candidate-dashboard__avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="candidate-dashboard__visual-card">
              <span>Profile completion</span>

              <strong>{dashboard.profileCompletion}%</strong>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* STATS */}
        {/* ================================================== */}

        <section className="candidate-dashboard__stats">
          {stats.map((stat) => (
            <button
              type="button"
              key={stat.label}
              className={`candidate-dashboard__stat candidate-dashboard__stat--${stat.className}`}
              onClick={stat.action}
              disabled={!stat.action}
            >
              <div className="candidate-dashboard__stat-icon">{stat.icon}</div>

              <div className="candidate-dashboard__stat-content">
                <span>{stat.label}</span>

                <strong>{stat.value}</strong>
              </div>

              {stat.action && (
                <ArrowForward className="candidate-dashboard__stat-arrow" />
              )}
            </button>
          ))}
        </section>

        {/* ================================================== */}
        {/* MAIN CONTENT */}
        {/* ================================================== */}

        <section className="candidate-dashboard__grid">
          {/* ================================================= */}
          {/* RECENT APPLICATIONS */}
          {/* ================================================= */}

          <div className="candidate-dashboard__card">
            <div className="candidate-dashboard__card-header">
              <div>
                <span className="candidate-dashboard__card-label">
                  Job search
                </span>

                <h2>Recent Applications</h2>
              </div>

              <Button
                variant="text"
                endIcon={<ArrowForward />}
                onClick={() => navigate("/my-applications")}
              >
                View all
              </Button>
            </div>

            {dashboard.recentApplications.length > 0 ? (
              <div className="candidate-dashboard__application-list">
                {dashboard.recentApplications.map((application) => (
                  <div
                    className="candidate-dashboard__application"
                    key={application.id}
                  >
                    <div className="candidate-dashboard__application-icon">
                      <BusinessCenterOutlined />
                    </div>

                    <div className="candidate-dashboard__application-info">
                      <h3>{application.job.title}</h3>

                      <p>{application.job.companyName || "Company"}</p>
                    </div>

                    <span className="candidate-dashboard__application-status">
                      {application.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="candidate-dashboard__empty">
                <div className="candidate-dashboard__empty-icon">
                  <DescriptionOutlined />
                </div>

                <h3>No applications yet</h3>

                <p>
                  Start exploring jobs and apply to positions that match your
                  skills.
                </p>

                <Button variant="outlined" onClick={() => navigate("/jobs")}>
                  Find Jobs
                </Button>
              </div>
            )}
          </div>

          {/* ================================================= */}
          {/* PROFILE COMPLETION */}
          {/* ================================================= */}

          <div className="candidate-dashboard__card candidate-dashboard__profile">
            <div className="candidate-dashboard__card-header">
              <div>
                <span className="candidate-dashboard__card-label">
                  Your profile
                </span>

                <h2>Complete your profile</h2>
              </div>

              <PersonOutlined />
            </div>

            <div className="candidate-dashboard__profile-progress">
              <div className="candidate-dashboard__progress-header">
                <span>Profile completion</span>

                <strong>{dashboard.profileCompletion}%</strong>
              </div>

              <div className="candidate-dashboard__progress-track">
                <div
                  className="candidate-dashboard__progress-bar"
                  style={{
                    width: `${dashboard.profileCompletion}%`,
                  }}
                />
              </div>

              <p>
                Add your professional information, skills and resume to improve
                your chances of getting noticed.
              </p>
            </div>

            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={() => navigate("/profile")}
            >
              Manage Profile
            </Button>
          </div>
        </section>

        {/* ================================================== */}
        {/* RECOMMENDED JOBS */}
        {/* ================================================== */}

        <section className="candidate-dashboard__jobs">
          <div className="candidate-dashboard__card-header">
            <div>
              <span className="candidate-dashboard__card-label">Discover</span>

              <h2>Recommended Jobs</h2>

              <p>Opportunities selected based on your profile and interests.</p>
            </div>

            <Button
              variant="text"
              endIcon={<ArrowForward />}
              onClick={() => navigate("/jobs")}
            >
              Browse jobs
            </Button>
          </div>

          {dashboard.recommendedJobs.length > 0 ? (
            <div className="candidate-dashboard__recommended-list">
              {dashboard.recommendedJobs.map((job) => (
                <div
                  key={job.id}
                  className="candidate-dashboard__recommended-job"
                >
                  <div>
                    <h3>{job.title}</h3>

                    <p>{job.companyName || "Company"}</p>
                  </div>

                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    View Job
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="candidate-dashboard__jobs-empty">
              <div className="candidate-dashboard__jobs-icon">
                <BusinessCenterOutlined />
              </div>

              <div>
                <h3>Find your next opportunity</h3>

                <p>
                  Complete your profile and start exploring jobs to get better
                  recommendations.
                </p>
              </div>

              <Button variant="contained" onClick={() => navigate("/jobs")}>
                Explore Jobs
              </Button>
            </div>
          )}
        </section>

        {/* ================================================== */}
        {/* QUICK ACTIONS */}
        {/* ================================================== */}

        <section className="candidate-dashboard__quick-actions">
          <h2>Quick Actions</h2>

          <div className="candidate-dashboard__quick-grid">
            <button type="button" onClick={() => navigate("/jobs")}>
              <Search />

              <span>
                <strong>Find Jobs</strong>

                <small>Discover new opportunities</small>
              </span>

              <ArrowForward />
            </button>

            <button type="button" onClick={() => navigate("/my-applications")}>
              <DescriptionOutlined />

              <span>
                <strong>My Applications</strong>

                <small>Track your applications</small>
              </span>

              <ArrowForward />
            </button>

            <button type="button" onClick={() => navigate("/profile")}>
              <PersonOutlined />

              <span>
                <strong>My Profile</strong>

                <small>Manage your professional profile</small>
              </span>

              <ArrowForward />
            </button>

            <button type="button" onClick={() => navigate("/interviews")}>
              <EventOutlined />

              <span>
                <strong>Interview Prep</strong>

                <small>Practice for your next interview</small>
              </span>

              <ArrowForward />
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default CandidateDashboard;
