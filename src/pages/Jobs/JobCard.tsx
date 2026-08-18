import {
  Bookmark,
  BookmarkBorder,
  Business,
  LocationOn,
  WorkOutlined,
} from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

import type { Job } from "../../features/jobs/jobsApi";

import "./JobCard.scss";

interface JobCardProps {
  job: Job;
  saved?: boolean;
  onSave?: () => void;
  isSaving?: boolean;
}

const JobCard = ({
  job,
  saved = false,
  onSave,
  isSaving = false,
}: JobCardProps) => {
  const navigate = useNavigate();

  const formatSalary = () => {
    if (!job.salaryMin && !job.salaryMax) {
      return "Salary not disclosed";
    }

    const formatAmount = (amount: number) => {
      if (job.currency === "INR") {
        return `₹${(amount / 100000).toFixed(1)}L`;
      }

      return `${job.currency} ${amount.toLocaleString()}`;
    };

    if (job.salaryMin && job.salaryMax) {
      return `${formatAmount(job.salaryMin)} - ${formatAmount(job.salaryMax)}`;
    }

    if (job.salaryMin) {
      return `From ${formatAmount(job.salaryMin)}`;
    }

    return `Up to ${formatAmount(job.salaryMax!)}`;
  };

  const getExperienceLabel = () => {
    switch (job.experienceLevel) {
      case "FRESHER":
        return "Fresher";

      case "JUNIOR":
        return "Junior";

      case "MID":
        return "Mid Level";

      case "SENIOR":
        return "Senior";

      case "LEAD":
        return "Lead";

      default:
        return job.experienceLevel;
    }
  };

  const getEmploymentLabel = () => {
    return job.employmentType
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const handleSave = () => {
    if (!isSaving) {
      onSave?.();
    }
  };

  const handleViewJob = () => {
    navigate(`/jobs/${job.id}`);
  };

  return (
    <article className="job-card">
      {/* --------------------------------------------------------------- */}
      {/* TOP */}
      {/* --------------------------------------------------------------- */}

      <div className="job-card__top">
        <div className="job-card__company-logo">
          {job.company?.logoUrl ? (
            <img src={job.company.logoUrl} alt={`${job.company.name} logo`} />
          ) : (
            <Business />
          )}
        </div>

        <button
          type="button"
          className={`job-card__save ${saved ? "job-card__save--active" : ""}`}
          onClick={handleSave}
          disabled={isSaving}
          aria-label={saved ? "Remove saved job" : "Save job"}
        >
          {isSaving ? (
            <CircularProgress size={20} />
          ) : saved ? (
            <Bookmark />
          ) : (
            <BookmarkBorder />
          )}
        </button>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* CONTENT */}
      {/* --------------------------------------------------------------- */}

      <div className="job-card__content">
        <h3 className="job-card__title">{job.title}</h3>

        <p className="job-card__company">{job.company?.name || "Company"}</p>

        <div className="job-card__details">
          <span>
            <LocationOn />
            {job.location || "Location not specified"}
          </span>

          <span>
            <WorkOutlined />
            {getEmploymentLabel()}
          </span>
        </div>

        <div className="job-card__tags">
          <span>{getExperienceLabel()}</span>

          <span>{getEmploymentLabel()}</span>
        </div>

        <div className="job-card__salary">{formatSalary()}</div>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* FOOTER */}
      {/* --------------------------------------------------------------- */}

      <div className="job-card__footer">
        <span className="job-card__applications">
          {job._count?.applications ?? 0} applications
        </span>

        <Button
          variant="contained"
          className="job-card__button"
          onClick={handleViewJob}
        >
          View Job
        </Button>
      </div>
    </article>
  );
};

export default JobCard;
