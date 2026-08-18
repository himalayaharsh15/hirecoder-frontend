import { useAppSelector } from "../../App/hook";
import CandidateDashboard from "./CandidateDashboard/CandidateDashboard";
import RecruiterDashboard from "./RecruiterDashboard/RecruiterDashboard";

const Dashboard = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return null;
  }

  if (user.role === "CANDIDATE") {
    return <CandidateDashboard />;
  }

  if (user.role === "RECRUITER") {
    return <RecruiterDashboard />;
  }

  return null;
};

export default Dashboard;
