import {
  ArrowForward,
  BusinessCenterOutlined,
  CalendarTodayOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";

import type { MyApplication } from "../../features/application/application.types";

import "./MyApplicationCard.scss";

interface MyApplicationCardProps {
  application: MyApplication;
  onView: () => void;
}

const MyApplicationCard = ({ application, onView }: MyApplicationCardProps) => {
  const { job } = application;

  const formattedDate = new Date(application.createdAt).toLocaleDateString(
    undefined,
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  const statusClass = application.status.toLowerCase();

  const formattedStatus = application.status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <article className="my-application-card">
      {/* ============================================================
          COMPANY / JOB HEADER
      ============================================================ */}

      <div className="my-application-card__header">
        <div className="my-application-card__company">
          <div className="my-application-card__logo">
            {job.company.logoUrl ? (
              <img src={job.company.logoUrl} alt={`${job.company.name} logo`} />
            ) : (
              <BusinessCenterOutlined />
            )}
          </div>

          <div className="my-application-card__company-info">
            <span>{job.company.name}</span>

            <h2>{job.title}</h2>
          </div>
        </div>

        {/* Application status */}
        <span
          className={`my-application-card__status my-application-card__status--${statusClass}`}
        >
          {formattedStatus}
        </span>
      </div>

      {/* ============================================================
          JOB INFORMATION
      ============================================================ */}

      <div className="my-application-card__details">
        {job.location && (
          <div className="my-application-card__detail">
            <LocationOnOutlined />

            <span>{job.location}</span>
          </div>
        )}

        {job.employmentType && (
          <div className="my-application-card__detail">
            <BusinessCenterOutlined />

            <span>
              {job.employmentType
                .replaceAll("_", " ")
                .toLowerCase()
                .replace(/\b\w/g, (letter) => letter.toUpperCase())}
            </span>
          </div>
        )}

        {job.experienceLevel && (
          <div className="my-application-card__detail">
            <span className="my-application-card__experience">
              {job.experienceLevel}
            </span>
          </div>
        )}

        <div className="my-application-card__detail">
          <CalendarTodayOutlined />

          <span>Applied {formattedDate}</span>
        </div>
      </div>

      {/* ============================================================
          FOOTER
      ============================================================ */}

      <div className="my-application-card__footer">
        <span className="my-application-card__application-id">
          Application ID: {application.id.slice(-8)}
        </span>

        <button
          type="button"
          className="my-application-card__view-button"
          onClick={onView}
        >
          View Application
          <ArrowForward />
        </button>
      </div>
    </article>
  );
};

export default MyApplicationCard;
