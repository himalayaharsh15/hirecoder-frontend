import { Navigate, useLocation, useParams } from "react-router-dom";

import type { InterviewPrep } from "../../features/ai/types";
import InterviewSession from "../InterviewSession/InterviewSession";

interface InterviewSessionLocationState {
  prep?: InterviewPrep;
}

const InterviewSessionPage = () => {
  const { jobId } = useParams<{
    jobId: string;
  }>();

  const location = useLocation();

  const state = location.state as InterviewSessionLocationState | null;

  const prep = state?.prep;

  if (!jobId || !prep) {
    return <Navigate to="/interview-prep" replace />;
  }

  return <InterviewSession jobId={jobId} prep={prep} />;
};

export default InterviewSessionPage;
