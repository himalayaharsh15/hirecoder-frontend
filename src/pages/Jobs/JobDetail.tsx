import { useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Alert, Button, Chip, CircularProgress, Divider } from "@mui/material";

import DOMPurify from "dompurify";

import {
  AccessTime,
  ArrowBack,
  Bookmark,
  BookmarkBorder,
  Business,
  LocationOn,
  PeopleOutlined,
  WorkOutlined,
} from "@mui/icons-material";

import {
  useApplyToJobMutation,
  useGetJobApplicationQuery,
  useGetJobQuery,
  useGetJobSavedStatusQuery,
  useSaveJobMutation,
  useUnsaveJobMutation,
} from "../../features/jobs/jobsApi";

import ApplyJobDialog from "../../components/Jobs/ApplyJobDialog";

import "./JobDetail.scss";
import type { JobMatch } from "../../features/ai/types";
import { useAnalyzeMyJobMatchMutation } from "../../features/ai/aiApi";
import JobMatchSkeleton from "../../components/Jobs/JobMatch/JobMatchSkeleton";
import JobMatchResult from "../../components/Jobs/JobMatch/JobMatchResult";

// ============================================================
// FORMATTING HELPERS
// ============================================================

const formatEmploymentType = (value: string) =>
  value
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatExperienceLevel = (value: string) =>
  value.charAt(0) + value.slice(1).toLowerCase();

const formatSalary = (
  salaryMin?: number | null,
  salaryMax?: number | null,
  currency = "INR",
) => {
  if (!salaryMin && !salaryMax) {
    return "Salary not disclosed";
  }

  const formatAmount = (amount: number) => {
    if (currency === "INR") {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }

    return `${currency} ${amount.toLocaleString()}`;
  };

  if (salaryMin && salaryMax) {
    return `${formatAmount(salaryMin)} - ${formatAmount(salaryMax)}`;
  }

  if (salaryMin) {
    return `From ${formatAmount(salaryMin)}`;
  }

  return `Up to ${formatAmount(salaryMax!)}`;
};

const formatPostedDate = (date: string) => {
  const postedDate = new Date(date);
  const now = new Date();

  const difference = now.getTime() - postedDate.getTime();

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (days <= 0) {
    return "Posted today";
  }

  if (days === 1) {
    return "Posted 1 day ago";
  }

  if (days < 30) {
    return `Posted ${days} days ago`;
  }

  const months = Math.floor(days / 30);

  return months === 1 ? "Posted 1 month ago" : `Posted ${months} months ago`;
};

const decodeHtml = (html: string) => {
  const textarea = document.createElement("textarea");

  textarea.innerHTML = html;

  return textarea.value;
};

// ============================================================
// JOB DETAILS
// ============================================================

const JobDetails = () => {
  const { jobId } = useParams<{
    jobId: string;
  }>();

  const navigate = useNavigate();

  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);

  const [jobMatchResult, setJobMatchResult] = useState<JobMatch | null>(null);

  const jobMatchResultRef = useRef<HTMLDivElement | null>(null);

  // ============================================================
  // JOB
  // ============================================================

  const { data, isLoading, isError, refetch } = useGetJobQuery(jobId!, {
    skip: !jobId,
  });

  // ============================================================
  // SAVED JOB
  // ============================================================

  const { data: savedStatus, isLoading: isSavedLoading } =
    useGetJobSavedStatusQuery(jobId!, {
      skip: !jobId,
    });

  const [saveJob, { isLoading: isSaving }] = useSaveJobMutation();

  const [unsaveJob, { isLoading: isUnsaving }] = useUnsaveJobMutation();

  const isSaved = savedStatus?.saved ?? false;

  const isSaveActionLoading = isSavedLoading || isSaving || isUnsaving;

  // ============================================================
  // APPLICATION
  // ============================================================

  const {
    data: applicationStatus,
    isLoading: isApplicationLoading,
    refetch: refetchApplicationStatus,
  } = useGetJobApplicationQuery(jobId!, {
    skip: !jobId,
  });

  const [applyToJob, { isLoading: isApplying }] = useApplyToJobMutation();

  const [analyzeMyJobMatch, { isLoading: isAnalyzingMatch }] =
    useAnalyzeMyJobMatchMutation();

  // ============================================================
  // APPLICATION STATUS
  // ============================================================
  //
  // applicationStatus should now return:
  //
  // {
  //   applied: boolean;
  //   status: ApplicationStatus | null;
  // }
  //
  // ============================================================

  // ============================================================
  // APPLICATION STATUS
  // ============================================================

  // The API returns the status inside `application`:
  //
  // {
  //   applied: true,
  //   application: {
  //     id: "...",
  //     status: "WITHDRAWN"
  //   }
  // }

  const applicationStatusValue = applicationStatus?.application?.status ?? null;

  const hasApplication = applicationStatus?.applied ?? false;

  const isWithdrawn = applicationStatusValue === "WITHDRAWN";

  const hasActiveApplication = hasApplication && !isWithdrawn;

  // ============================================================
  // SAVE / UNSAVE
  // ============================================================

  const handleSaveJob = async () => {
    if (!jobId || isSaveActionLoading) {
      return;
    }

    try {
      if (isSaved) {
        await unsaveJob(jobId).unwrap();
      } else {
        await saveJob(jobId).unwrap();
      }
    } catch (error) {
      console.error("Failed to update saved job:", error);
    }
  };

  // ============================================================
  // Analyise the Job With Candidate Profile
  // ============================================================

  const handleAnalyzeMatch = async () => {
    if (!jobId || isAnalyzingMatch) {
      return;
    }

    try {
      // Scroll to the analysis section immediately
      setTimeout(() => {
        jobMatchResultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);

      const response = await analyzeMyJobMatch(jobId).unwrap();

      setJobMatchResult(response.analysis);
    } catch (error) {
      console.error("Failed to analyze job match:", error);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (isLoading) {
    return (
      <section className="job-details job-details--loading">
        <CircularProgress />

        <p>Loading job details...</p>
      </section>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (isError || !data?.job) {
    return (
      <section className="job-details">
        <div className="job-details__error">
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => refetch()}>
                Retry
              </Button>
            }
          >
            Unable to load this job.
          </Alert>

          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/jobs")}
            className="job-details__back-button"
          >
            Back to Jobs
          </Button>
        </div>
      </section>
    );
  }

  const { job } = data;

  const companyName = job.company?.name || "Company";

  // ============================================================
  // EXTERNAL APPLY
  // ============================================================

  const handleExternalApply = () => {
    if (job.applyUrl) {
      window.open(job.applyUrl, "_blank", "noopener,noreferrer");

      return;
    }

    if (job.sourceUrl) {
      window.open(job.sourceUrl, "_blank", "noopener,noreferrer");
    }
  };

  // ============================================================
  // APPLY
  // ============================================================

  const handleApplyClick = () => {
    // ----------------------------------------------------------
    // EXTERNAL JOB
    // ----------------------------------------------------------

    if (job.source === "GREENHOUSE") {
      handleExternalApply();

      return;
    }

    // ----------------------------------------------------------
    // INTERNAL HIRECODER JOB
    // ----------------------------------------------------------

    // Candidate already has an active application.
    //
    // Do not open the application dialog.
    if (hasActiveApplication) {
      return;
    }

    // If the application was withdrawn,
    // this opens the application dialog again.
    //
    // Backend will reuse the existing WITHDRAWN
    // application and change it back to APPLIED.
    setIsApplyDialogOpen(true);
  };

  // ============================================================
  // SUBMIT APPLICATION
  // ============================================================

  const handleSubmitApplication = async (coverLetter?: string) => {
    // Prevent submission when the candidate already
    // has an active application.
    //
    // WITHDRAWN applications are allowed to apply again.
    if (!jobId || hasActiveApplication || isApplying) {
      return;
    }

    try {
      await applyToJob({
        jobId,
        coverLetter,
        resumeUrl: undefined,
      }).unwrap();

      // Close application dialog.
      setIsApplyDialogOpen(false);

      // Refresh application status.
      //
      // This changes:
      //
      // WITHDRAWN
      //      ↓
      // APPLIED
      //
      // and updates the Apply button immediately.
      await refetchApplicationStatus();
    } catch (error) {
      console.error("Failed to submit application:", error);
    }
  };

  const isExternalJob = job.source === "GREENHOUSE";

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section className="job-details">
      <div className="job-details__container">
        {/* ======================================================
            BACK
        ====================================================== */}

        <button
          type="button"
          className="job-details__back"
          onClick={() => navigate("/jobs")}
        >
          <ArrowBack />
          Back to Jobs
        </button>

        <div className="job-details__layout">
          {/* ====================================================
              MAIN
          ==================================================== */}

          <main className="job-details__main">
            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="job-details__header">
              <div className="job-details__company-logo">
                {job.company?.logoUrl ? (
                  <img src={job.company.logoUrl} alt={`${companyName} logo`} />
                ) : (
                  <Business />
                )}
              </div>

              <div className="job-details__header-content">
                <div className="job-details__source-row">
                  <Chip
                    label={isExternalJob ? "External Job" : "HireCoder"}
                    size="small"
                    className="job-details__source"
                  />

                  <span>{formatPostedDate(job.createdAt)}</span>
                </div>

                <h1>{job.title}</h1>

                <p className="job-details__company">
                  <Business />

                  {companyName}
                </p>
              </div>

              {/* ==================================================
                  SAVE
              ================================================== */}

              <button
                type="button"
                className={`job-details__save ${
                  isSaved ? "job-details__save--active" : ""
                }`}
                onClick={handleSaveJob}
                disabled={isSaveActionLoading}
                aria-label={isSaved ? "Remove saved job" : "Save job"}
              >
                {isSaveActionLoading ? (
                  <CircularProgress size={20} />
                ) : isSaved ? (
                  <Bookmark />
                ) : (
                  <BookmarkBorder />
                )}
              </button>
            </div>

            <Divider />

            {/* ==================================================
                SUMMARY
            ================================================== */}

            <div className="job-details__summary">
              <div className="job-details__summary-item">
                <LocationOn />

                <div>
                  <span>Location</span>

                  <strong>{job.location || "Location not specified"}</strong>
                </div>
              </div>

              <div className="job-details__summary-item">
                <WorkOutlined />

                <div>
                  <span>Employment</span>

                  <strong>{formatEmploymentType(job.employmentType)}</strong>
                </div>
              </div>

              <div className="job-details__summary-item">
                <AccessTime />

                <div>
                  <span>Experience</span>

                  <strong>{formatExperienceLevel(job.experienceLevel)}</strong>
                </div>
              </div>

              <div className="job-details__summary-item">
                <PeopleOutlined />

                <div>
                  <span>Applications</span>

                  <strong>{job._count?.applications ?? 0}</strong>
                </div>
              </div>
            </div>

            <Divider />

            {/* ==================================================
                DESCRIPTION
            ================================================== */}

            <section className="job-details__section">
              <h2>About the role</h2>

              <div
                className="job-details__description"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(decodeHtml(job.description || "")),
                }}
              />
            </section>

            {/* ==================================================
                JOB INFORMATION
            ================================================== */}

            <section className="job-details__section">
              <h2>Job information</h2>

              <div className="job-details__information">
                <div>
                  <span>Experience Level</span>

                  <strong>{formatExperienceLevel(job.experienceLevel)}</strong>
                </div>

                <div>
                  <span>Employment Type</span>

                  <strong>{formatEmploymentType(job.employmentType)}</strong>
                </div>

                <div>
                  <span>Salary</span>

                  <strong>
                    {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                  </strong>
                </div>

                <div>
                  <span>Location</span>

                  <strong>{job.location || "Not specified"}</strong>
                </div>
              </div>
            </section>

            {/* ==================================================
                COMPANY
            ================================================== */}

            {job.company && (
              <section className="job-details__section">
                <h2>About {companyName}</h2>

                <div className="job-details__company-info">
                  <div className="job-details__company-logo job-details__company-logo--small">
                    {job.company.logoUrl ? (
                      <img
                        src={job.company.logoUrl}
                        alt={`${companyName} logo`}
                      />
                    ) : (
                      <Business />
                    )}
                  </div>

                  <div>
                    <h3>{companyName}</h3>

                    {job.company.location && (
                      <p>
                        <LocationOn />

                        {job.company.location}
                      </p>
                    )}
                  </div>
                </div>

                {job.company.description && (
                  <p className="job-details__company-description">
                    {job.company.description}
                  </p>
                )}

                {job.company.website && (
                  <a
                    href={job.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="job-details__company-link"
                  >
                    Visit company website
                  </a>
                )}
              </section>
            )}
          </main>

          {/* ====================================================
              SIDEBAR
          ==================================================== */}

          <aside className="job-details__sidebar">
            {/* ==================================================
                APPLY CARD
            ================================================== */}

            <div className="job-details__apply-card">
              <div>
                <span className="job-details__apply-label">Compensation</span>

                <h2>
                  {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                </h2>
              </div>

              {/* ==================================================
                  APPLY BUTTON
              ================================================== */}

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleApplyClick}
                disabled={
                  isApplicationLoading ||
                  (isExternalJob && !job.applyUrl && !job.sourceUrl) ||
                  (!isExternalJob && hasActiveApplication)
                }
              >
                {isApplicationLoading ? (
                  <CircularProgress size={22} />
                ) : isExternalJob ? (
                  "Apply on company site"
                ) : isWithdrawn ? (
                  "Apply Again"
                ) : hasActiveApplication ? (
                  "✓ Applied"
                ) : (
                  "Apply Now"
                )}
              </Button>

              {/* ==================================================
                  SAVE BUTTON
              ================================================== */}

              <Button
                variant="outlined"
                fullWidth
                size="large"
                startIcon={
                  isSaveActionLoading ? (
                    <CircularProgress size={18} />
                  ) : isSaved ? (
                    <Bookmark />
                  ) : (
                    <BookmarkBorder />
                  )
                }
                onClick={handleSaveJob}
                disabled={isSaveActionLoading}
              >
                {isSaved ? "Saved" : "Save Job"}
              </Button>

              {/* ==================================================
                  Analyse Button
              ================================================== */}

              <Button
                variant="outlined"
                fullWidth
                size="large"
                className="job-details__ai-match-button"
                onClick={handleAnalyzeMatch}
                disabled={isAnalyzingMatch}
              >
                {isAnalyzingMatch ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Analyzing...
                  </>
                ) : (
                  "✨ Analyze My Match"
                )}
              </Button>

              {isExternalJob && (
                <p className="job-details__external-note">
                  This job is provided by an external hiring platform. You'll be
                  redirected to the original application page.
                </p>
              )}

              {/* ==================================================
                  WITHDRAWN INFO
              ================================================== */}

              {!isExternalJob && isWithdrawn && (
                <p className="job-details__external-note">
                  You previously withdrew your application. You can apply again
                  if you are still interested in this position.
                </p>
              )}
            </div>

            {/* ==================================================
                QUICK INFO
            ================================================== */}

            <div className="job-details__quick-info">
              <h3>Job overview</h3>

              <div>
                <LocationOn />

                <span>
                  <small>Location</small>

                  {job.location || "Not specified"}
                </span>
              </div>

              <div>
                <WorkOutlined />

                <span>
                  <small>Job type</small>

                  {formatEmploymentType(job.employmentType)}
                </span>
              </div>

              <div>
                <AccessTime />

                <span>
                  <small>Experience</small>

                  {formatExperienceLevel(job.experienceLevel)}
                </span>
              </div>

              <div>
                <PeopleOutlined />

                <span>
                  <small>Applicants</small>

                  {job._count?.applications ?? 0}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ========================================================
          APPLICATION DIALOG
      ======================================================== */}

      {!isExternalJob && (
        <ApplyJobDialog
          open={isApplyDialogOpen}
          jobTitle={job.title}
          companyName={companyName}
          companyLogoUrl={job.company?.logoUrl}
          isApplying={isApplying}
          onClose={() => setIsApplyDialogOpen(false)}
          onSubmit={handleSubmitApplication}
        />
      )}

      {/* ==================================================
    AI JOB MATCH
================================================== */}

      <div ref={jobMatchResultRef}>
        {isAnalyzingMatch && <JobMatchSkeleton />}

        {jobMatchResult && !isAnalyzingMatch && (
          <JobMatchResult result={jobMatchResult} />
        )}
      </div>
    </section>
  );
};

export default JobDetails;
