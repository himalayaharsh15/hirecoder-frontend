import {
  ArrowForward,
  BusinessCenterOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";

import "./RecruiterDashboard.scss";

interface RecruiterJobItemProps {
  job: {
    id: string;
    title: string;
    location?: string | null;
    isActive?: boolean;
  };

  onApplications: () => void;
}

const RecruiterJobItem = ({ job, onApplications }: RecruiterJobItemProps) => {
  return (
    <article className="recruiter-dashboard__job-item">
      {/* Job icon */}
      <div className="recruiter-dashboard__job-icon">
        <BusinessCenterOutlined />
      </div>

      {/* Job information */}
      <div className="recruiter-dashboard__job-info">
        <h3>{job.title}</h3>

        <div className="recruiter-dashboard__job-meta">
          {job.location && (
            <span>
              <LocationOnOutlined />
              {job.location}
            </span>
          )}

          <span
            className={
              job.isActive
                ? "recruiter-dashboard__job-status recruiter-dashboard__job-status--active"
                : "recruiter-dashboard__job-status"
            }
          >
            <span className="recruiter-dashboard__status-dot" />

            {job.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Applications */}
      <button
        type="button"
        className="recruiter-dashboard__job-action"
        onClick={onApplications}
      >
        <span>Applications</span>

        <ArrowForward fontSize="small" />
      </button>
    </article>
  );
};

export default RecruiterJobItem;
