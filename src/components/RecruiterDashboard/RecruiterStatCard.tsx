import { TrendingUp } from "@mui/icons-material";

import "./RecruiterDashboard.scss";

interface RecruiterStatCardProps {
  label: string;
  value: number;
  description: string;
}

const RecruiterStatCard = ({
  label,
  value,
  description,
}: RecruiterStatCardProps) => {
  return (
    <article className="recruiter-dashboard__stat">
      <div className="recruiter-dashboard__stat-top">
        <span>{label}</span>

        <div className="recruiter-dashboard__stat-icon">
          <TrendingUp fontSize="small" />
        </div>
      </div>

      <strong>{value}</strong>

      <p>{description}</p>
    </article>
  );
};

export default RecruiterStatCard;
