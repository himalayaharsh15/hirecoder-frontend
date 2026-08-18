import { useNavigate } from "react-router-dom";

import "./RecruiterDashboard.scss";

import RecruiterStatCard from "../../../components/RecruiterDashboard/RecruiterStatCard";
import RecruiterJobItem from "../../../components/RecruiterDashboard/RecruiterJobItem";
import RecruiterApplicantItem from "../../../components/RecruiterDashboard/RecruiterApplicantItem";
import RecruiterPipeline from "../../../components/RecruiterDashboard/RecruiterPipeline";

import { useAppSelector } from "../../../App/hook";

import { useGetMyJobsQuery } from "../../../features/jobs/jobsApi";

import {
  useGetRecruiterDashboardStatsQuery,
  useGetRecentRecruiterApplicationsQuery,
} from "../../../features/application/applicationApi";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  // ============================================================
  // JOBS
  // ============================================================

  const {
    data: jobsData,
    isLoading: isJobsLoading,
    isError: isJobsError,
  } = useGetMyJobsQuery({
    page: 1,
    limit: 50,
  });

  const jobs = jobsData?.jobs ?? [];

  // ============================================================
  // RECRUITER SUMMARY
  // ============================================================

  const {
    data: dashboardStats,
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useGetRecruiterDashboardStatsQuery();

  // ============================================================
  // RECENT APPLICATIONS
  // ============================================================

  const {
    data: recentApplicationsData,
    isLoading: isRecentApplicationsLoading,
    isError: isRecentApplicationsError,
  } = useGetRecentRecruiterApplicationsQuery();

  const recentApplications = recentApplicationsData?.applications ?? [];

  // ============================================================
  // ACTIVE JOBS
  // ============================================================

  const activeJobs = jobs.filter((job) => job.isActive).length;

  // ============================================================
  // LOADING
  // ============================================================

  const isLoading =
    isJobsLoading || isStatsLoading || isRecentApplicationsLoading;

  if (isLoading) {
    return (
      <section className="recruiter-dashboard recruiter-dashboard--loading">
        <div className="recruiter-dashboard__loader">
          <div className="recruiter-dashboard__loader-spinner" />
          <span>Loading your dashboard...</span>
        </div>
      </section>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  const hasError = isJobsError || isStatsError || isRecentApplicationsError;

  return (
    <section className="recruiter-dashboard">
      <div className="recruiter-dashboard__container">
        {/* ======================================================
            HEADER
        ====================================================== */}

        <header className="recruiter-dashboard__header">
          <div className="recruiter-dashboard__welcome">
            <span className="recruiter-dashboard__eyebrow">
              RECRUITER CENTER
            </span>

            <h1>Welcome back, {user?.name}</h1>

            <p>
              Manage your jobs, review applicants, and track your hiring
              activity.
            </p>
          </div>

          <button
            type="button"
            className="recruiter-dashboard__primary-button"
            onClick={() => navigate("/recruiter/jobs/create")}
          >
            <span className="recruiter-dashboard__button-icon">+</span>
            Post New Job
          </button>
        </header>

        {/* ======================================================
            ERROR
        ====================================================== */}

        {hasError && (
          <div className="recruiter-dashboard__error">
            <strong>Something went wrong</strong>
            <span>
              Some dashboard information could not be loaded. Please refresh the
              page.
            </span>
          </div>
        )}

        {/* ======================================================
            STATS
        ====================================================== */}

        <section className="recruiter-dashboard__stats">
          <RecruiterStatCard
            label="Active Jobs"
            value={activeJobs}
            description="Currently accepting applications"
          />

          <RecruiterStatCard
            label="Total Applicants"
            value={dashboardStats?.totalApplicants ?? 0}
            description="Candidates who applied"
          />

          <RecruiterStatCard
            label="Shortlisted"
            value={dashboardStats?.shortlisted ?? 0}
            description="Candidates moving forward"
          />

          <RecruiterStatCard
            label="Interviews"
            value={dashboardStats?.interviews ?? 0}
            description="Interviews scheduled"
          />
        </section>

        {/* ======================================================
            JOBS + APPLICANTS
        ====================================================== */}

        <section className="recruiter-dashboard__content">
          {/* ====================================================
              YOUR JOBS
          ==================================================== */}

          <div className="recruiter-dashboard__panel">
            <div className="recruiter-dashboard__panel-header">
              <div>
                <h2>Your Jobs</h2>

                <p>Manage your recently posted positions</p>
              </div>

              <button
                type="button"
                className="recruiter-dashboard__text-button"
                onClick={() => navigate("/recruiter/jobs")}
              >
                View all
                <span>→</span>
              </button>
            </div>

            {jobs.length === 0 ? (
              <div className="recruiter-dashboard__empty">
                <div className="recruiter-dashboard__empty-icon">+</div>

                <h3>No jobs posted yet</h3>

                <p>Create your first job and start receiving applications.</p>

                <button
                  type="button"
                  className="recruiter-dashboard__secondary-button"
                  onClick={() => navigate("/recruiter/jobs/create")}
                >
                  Post your first job
                </button>
              </div>
            ) : (
              <div className="recruiter-dashboard__job-list">
                {jobs.slice(0, 5).map((job) => (
                  <RecruiterJobItem
                    key={job.id}
                    job={job}
                    onApplications={() =>
                      navigate(`/recruiter/jobs/${job.id}/applications`)
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* ====================================================
              RECENT APPLICANTS
          ==================================================== */}

          <div className="recruiter-dashboard__panel">
            <div className="recruiter-dashboard__panel-header">
              <div>
                <h2>Recent Applicants</h2>

                <p>Latest candidates across your jobs</p>
              </div>

              <button
                type="button"
                className="recruiter-dashboard__text-button"
                onClick={() => navigate("/recruiter/jobs")}
              >
                View all
                <span>→</span>
              </button>
            </div>

            {recentApplications.length === 0 ? (
              <div className="recruiter-dashboard__empty">
                <div className="recruiter-dashboard__empty-icon">👤</div>

                <h3>No applicants yet</h3>

                <p>Applications from candidates will appear here.</p>

                <button
                  type="button"
                  className="recruiter-dashboard__secondary-button"
                  onClick={() => navigate("/recruiter/jobs")}
                >
                  View your jobs
                </button>
              </div>
            ) : (
              <div className="recruiter-dashboard__applicant-list">
                {recentApplications.slice(0, 5).map((application) => (
                  <RecruiterApplicantItem
                    key={application.id}
                    application={application}
                    onView={() =>
                      navigate(
                        `/recruiter/jobs/${application.job.id}/applications`,
                      )
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ======================================================
            PIPELINE
        ====================================================== */}

        <RecruiterPipeline
          pipeline={
            dashboardStats?.pipeline ?? {
              applied: 0,
              underReview: 0,
              shortlisted: 0,
              interviewScheduled: 0,
              offered: 0,
              rejected: 0,
              hired: 0,
              withdrawn: 0,
            }
          }
        />
      </div>
    </section>
  );
};

export default RecruiterDashboard;
