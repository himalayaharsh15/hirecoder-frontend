import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../App/hook";
import "./CandidateDashboard.scss";
import { Button } from "@mui/material";

const CandidateDashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <section className="candidate-dashboard">
      <div className="candidate-dashboard__container">
        <header className="candidate-dashboard__header">
          <h1>Welcome back, {user?.name}</h1>

          <p>
            Track your applications, discover new opportunities, and manage your
            job search.
          </p>
          <Button onClick={() => navigate("/jobs")}> Explore Jobs </Button>
        </header>

        <section className="candidate-dashboard__stats">
          <div className="candidate-dashboard__stat">
            <span>Applications</span>
            <strong>0</strong>
          </div>

          <div className="candidate-dashboard__stat">
            <span>Interviews</span>
            <strong>0</strong>
          </div>

          <div className="candidate-dashboard__stat">
            <span>Shortlisted</span>
            <strong>0</strong>
          </div>

          <div className="candidate-dashboard__stat">
            <span>Saved Jobs</span>
            <strong>0</strong>
          </div>
        </section>

        <section className="candidate-dashboard__content">
          <div className="candidate-dashboard__applications">
            <h2>Recent Applications</h2>
            <button type="button" onClick={() => navigate("/my-applications")}>
              My Applications
            </button>

            <p>No applications yet.</p>
          </div>

          <div className="candidate-dashboard__profile">
            <h2>Profile Completion</h2>

            <p>
              Complete your profile to improve your chances of getting hired.
            </p>
          </div>
        </section>

        <section className="candidate-dashboard__jobs">
          <h2>Recommended Jobs</h2>

          <p>No recommended jobs available yet.</p>
        </section>
      </div>
    </section>
  );
};

export default CandidateDashboard;
