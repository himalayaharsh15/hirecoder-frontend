import {
  ArrowForward,
  BusinessCenterOutlined,
  PersonOutlined,
} from "@mui/icons-material";

import type { RecentApplication } from "../../features/application/application.types";

import "./RecruiterDashboard.scss";

interface RecruiterApplicantItemProps {
  application: RecentApplication;
  onView: () => void;
}

const RecruiterApplicantItem = ({
  application,
  onView,
}: RecruiterApplicantItemProps) => {
  const candidate = application.candidate;
  const profile = candidate.profile;

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
    <article className="recruiter-dashboard__applicant">
      {/* ====================================================
          AVATAR
      ==================================================== */}

      <div className="recruiter-dashboard__applicant-avatar">
        {candidate.name ? (
          candidate.name.charAt(0).toUpperCase()
        ) : (
          <PersonOutlined />
        )}
      </div>

      {/* ====================================================
          INFORMATION
      ==================================================== */}

      <div className="recruiter-dashboard__applicant-info">
        <h3>{candidate.name}</h3>

        <div className="recruiter-dashboard__applicant-job">
          <BusinessCenterOutlined />

          <span>{application.job.title}</span>
        </div>

        {profile?.headline && <p>{profile.headline}</p>}

        <small>Applied {formattedDate}</small>
      </div>

      {/* ====================================================
          STATUS + ACTION
      ==================================================== */}

      <div className="recruiter-dashboard__applicant-action">
        <span
          className={`recruiter-dashboard__status recruiter-dashboard__status--${statusClass}`}
        >
          {formattedStatus}
        </span>

        <button type="button" onClick={onView}>
          View
          <ArrowForward fontSize="small" />
        </button>
      </div>
    </article>
  );
};

export default RecruiterApplicantItem;
