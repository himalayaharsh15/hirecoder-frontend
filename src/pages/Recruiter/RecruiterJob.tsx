import {
  Add,
  Business,
  EditOutlined,
  PeopleOutlined,
  WorkOutlined,
  DeleteOutlined,
} from "@mui/icons-material";

import {
  Alert,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import {
  useGetMyJobsQuery,
  useDeleteJobMutation,
} from "../../features/jobs/jobsApi";

import "./RecruiterJob.scss";
import { useGetRecruiterApplicationSummaryQuery } from "../../features/application/applicationApi";

const formatEmploymentType = (value: string) =>
  value
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatExperienceLevel = (value: string) =>
  value.charAt(0) + value.slice(1).toLowerCase();

const formatSalary = (
  min?: number | null,
  max?: number | null,
  currency = "INR",
) => {
  if (!min && !max) {
    return "Salary not disclosed";
  }

  const amount = (value: number) => {
    if (currency === "INR") {
      return `₹${(value / 100000).toFixed(1)}L`;
    }

    return `${currency} ${value.toLocaleString()}`;
  };

  if (min && max) {
    return `${amount(min)} - ${amount(max)}`;
  }

  if (min) {
    return `From ${amount(min)}`;
  }

  return `Up to ${amount(max!)}`;
};

const RecruiterJobs = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useGetMyJobsQuery({
    page: 1,
    limit: 50,
  });

  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

  const jobs = data?.jobs ?? [];

  const {
    data: applicationSummary,
    isLoading: isApplicationSummaryLoading,
    isError: isApplicationSummaryError,
  } = useGetRecruiterApplicationSummaryQuery();

  const handleDelete = async (jobId: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteJob(jobId).unwrap();

      await refetch();
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  return (
    <section className="recruiter-jobs">
      <div className="recruiter-jobs__container">
        {/* ================================================================ */}
        {/* HEADER */}
        {/* ================================================================ */}

        <header className="recruiter-jobs__header">
          <div>
            <span className="recruiter-jobs__eyebrow">RECRUITER CENTER</span>

            <h1>Manage your jobs</h1>

            <p>
              Create, manage and track the opportunities you've published on
              HireCoder.
            </p>
          </div>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/recruiter/jobs/create")}
          >
            Create Job
          </Button>
        </header>

        {/* ================================================================ */}
        {/* STATS */}
        {/* ================================================================ */}

        <div className="recruiter-jobs__stats">
          <div className="recruiter-jobs__stat">
            <div className="recruiter-jobs__stat-icon">
              <WorkOutlined />
            </div>

            <div>
              <span>Total Jobs</span>
              <strong>{jobs.length}</strong>
            </div>
          </div>

          <div className="recruiter-jobs__stat">
            <div className="recruiter-jobs__stat-icon">
              <Business />
            </div>

            <div>
              <span>Active Jobs</span>

              <strong>{jobs.filter((job) => job.isActive).length}</strong>
            </div>
          </div>

          <div className="recruiter-jobs__stat">
            <div className="recruiter-jobs__stat-icon">
              <PeopleOutlined />
            </div>

            <div>
              <span>Applications</span>

              <strong>
                {isApplicationSummaryLoading
                  ? "..."
                  : (applicationSummary?.totalApplicants ?? 0)}
              </strong>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* ERROR */}
        {/* ================================================================ */}

        {isError && (
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={refetch}>
                Retry
              </Button>
            }
          >
            Unable to load your jobs.
          </Alert>
        )}

        {/* ================================================================ */}
        {/* LOADING */}
        {/* ================================================================ */}

        {isLoading && (
          <div className="recruiter-jobs__loading">
            <CircularProgress />

            <p>Loading your jobs...</p>
          </div>
        )}

        {/* ================================================================ */}
        {/* EMPTY */}
        {/* ================================================================ */}

        {!isLoading && !isError && jobs.length === 0 && (
          <div className="recruiter-jobs__empty">
            <div className="recruiter-jobs__empty-icon">
              <WorkOutlined />
            </div>

            <h2>No jobs posted yet</h2>

            <p>
              Create your first job and start receiving applications from
              candidates.
            </p>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/recruiter/jobs/create")}
            >
              Create Your First Job
            </Button>
          </div>
        )}

        {/* ================================================================ */}
        {/* JOB LIST */}
        {/* ================================================================ */}

        {!isLoading && !isError && jobs.length > 0 && (
          <div className="recruiter-jobs__list">
            {jobs.map((job) => (
              <article key={job.id} className="recruiter-jobs__card">
                {/* ------------------------------------------------------ */}
                {/* COMPANY */}
                {/* ------------------------------------------------------ */}

                <div className="recruiter-jobs__company">
                  <div className="recruiter-jobs__logo">
                    {job.company?.logoUrl ? (
                      <img
                        src={job.company.logoUrl}
                        alt={`${job.company.name} logo`}
                      />
                    ) : (
                      <Business />
                    )}
                  </div>

                  <div>
                    <h2>{job.title}</h2>

                    <p>{job.company?.name || "Company"}</p>
                  </div>
                </div>

                {/* ------------------------------------------------------ */}
                {/* STATUS */}
                {/* ------------------------------------------------------ */}

                <Chip
                  label={job?.isActive ? "Active" : "Inactive"}
                  size="small"
                  className={
                    job?.isActive
                      ? "recruiter-jobs__status recruiter-jobs__status--active"
                      : "recruiter-jobs__status recruiter-jobs__status--inactive"
                  }
                />

                {/* ------------------------------------------------------ */}
                {/* DETAILS */}
                {/* ------------------------------------------------------ */}

                <div className="recruiter-jobs__details">
                  <span>{job.location || "Remote / Not specified"}</span>

                  <span>{formatEmploymentType(job.employmentType)}</span>

                  <span>{formatExperienceLevel(job.experienceLevel)}</span>

                  <span>
                    {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                  </span>
                </div>

                {/* ------------------------------------------------------ */}
                {/* APPLICATIONS */}
                {/* ------------------------------------------------------ */}

                <div className="recruiter-jobs__applications">
                  <PeopleOutlined />

                  <div>
                    <strong>{job._count?.applications ?? 0}</strong>

                    <span>Applications</span>
                  </div>
                </div>

                {/* ------------------------------------------------------ */}
                {/* ACTIONS */}
                {/* ------------------------------------------------------ */}

                <div className="recruiter-jobs__actions">
                  <Tooltip title="Edit job">
                    <IconButton
                      onClick={() => navigate(`/recruiter/jobs/${job.id}/edit`)}
                    >
                      <EditOutlined />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete job">
                    <IconButton
                      color="error"
                      disabled={isDeleting}
                      onClick={() => handleDelete(job.id, job.title)}
                    >
                      {isDeleting ? (
                        <CircularProgress size={20} />
                      ) : (
                        <DeleteOutlined />
                      )}
                    </IconButton>
                  </Tooltip>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecruiterJobs;
