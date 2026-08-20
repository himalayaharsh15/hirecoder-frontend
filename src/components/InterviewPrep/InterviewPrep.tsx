import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import {
  ArrowBack,
  CheckCircleOutlined,
  PsychologyOutlined,
  RecordVoiceOverOutlined,
  RocketLaunchOutlined,
  SmartToyOutlined,
} from "@mui/icons-material";

import { useGetJobsQuery } from "../../features/jobs/jobsApi";

import { useGenerateInterviewPrepMutation } from "../../features/ai/aiApi";

import type { InterviewPrep } from "../../features/ai/types";

import "./InterviewPrep.scss";

const InterviewPrepPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const jobId = searchParams.get("jobId");

  // ============================================================
  // JOBS
  // ============================================================

  const {
    data: jobsData,
    isLoading: isJobsLoading,
    isError: isJobsError,
  } = useGetJobsQuery({
    page: 1,
    limit: 50,
  });

  // ============================================================
  // INTERVIEW PREP API
  // ============================================================

  const [generateInterviewPrep, { isLoading, error }] =
    useGenerateInterviewPrepMutation();

  // ============================================================
  // STATE
  // ============================================================

  const [selectedJobId, setSelectedJobId] = useState<string | null>(jobId);

  const [prep, setPrep] = useState<InterviewPrep | null>(null);

  // ============================================================
  // SELECT JOB
  // ============================================================

  const handleJobChange = (value: string) => {
    setSelectedJobId(value);

    // If the user changes the job after
    // generating preparation, discard the
    // previous preparation.
    setPrep(null);
  };

  // ============================================================
  // GENERATE INTERVIEW PREP
  // ============================================================

  const handleGeneratePrep = async () => {
    if (!selectedJobId) {
      return;
    }

    try {
      const response = await generateInterviewPrep(selectedJobId).unwrap();

      setPrep(response.interviewPrep);
    } catch (error) {
      console.error("Failed to generate interview preparation:", error);
    }
  };

  // ============================================================
  // START INTERVIEW
  // ============================================================

  const handleStartInterview = () => {
    if (!selectedJobId || !prep) {
      return;
    }

    navigate(`/interview-session/${selectedJobId}`, {
      state: {
        prep,
      },
    });
  };

  // ============================================================
  // BACK
  // ============================================================

  const handleBack = () => {
    navigate(-1);
  };

  // ============================================================
  // SELECTED JOB
  // ============================================================

  const selectedJob = jobsData?.jobs.find((job) => job.id === selectedJobId);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section className="interview-prep">
      <div className="interview-prep__container">
        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <header className="interview-prep__header">
          <button
            type="button"
            className="interview-prep__back"
            onClick={handleBack}
          >
            <ArrowBack />
            Back
          </button>

          <div className="interview-prep__badge">
            <SmartToyOutlined />
            AI INTERVIEW PREP
          </div>

          <h1>
            Prepare for your
            <span> next interview.</span>
          </h1>

          <p>
            Practice realistic interview questions generated specifically for
            the role you're applying for.
          </p>
        </header>

        {/* ================================================== */}
        {/* FEATURES */}
        {/* ================================================== */}

        <div className="interview-prep__features">
          <div className="interview-prep__feature">
            <div className="interview-prep__feature-icon">
              <PsychologyOutlined />
            </div>

            <div>
              <h3>Role-specific questions</h3>

              <p>
                Questions are generated based on the job you're preparing for.
              </p>
            </div>
          </div>

          <div className="interview-prep__feature">
            <div className="interview-prep__feature-icon">
              <RecordVoiceOverOutlined />
            </div>

            <div>
              <h3>Voice answers</h3>

              <p>Answer questions naturally using your microphone.</p>
            </div>
          </div>

          <div className="interview-prep__feature">
            <div className="interview-prep__feature-icon">
              <SmartToyOutlined />
            </div>

            <div>
              <h3>AI evaluation</h3>

              <p>Get feedback and evaluation after each answer.</p>
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* MAIN CARD */}
        {/* ================================================== */}

        <div className="interview-prep__card">
          {!prep ? (
            <>
              <div className="interview-prep__card-icon">
                <RocketLaunchOutlined />
              </div>

              <h2>Ready to practice?</h2>

              <p>
                Select a job and we'll generate a personalized interview session
                for that position.
              </p>

              {/* ========================================== */}
              {/* JOB SELECTOR */}
              {/* ========================================== */}

              <div className="interview-prep__job-selector">
                <FormControl fullWidth disabled={isJobsLoading || isLoading}>
                  <InputLabel id="interview-job-label">Select Job</InputLabel>

                  <Select
                    labelId="interview-job-label"
                    value={selectedJobId ?? ""}
                    label="Select Job"
                    onChange={(event) => {
                      handleJobChange(event.target.value);
                    }}
                  >
                    {jobsData?.jobs.map((job) => (
                      <MenuItem key={job.id} value={job.id}>
                        {job.title}

                        {job.company?.name ? ` — ${job.company.name}` : ""}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/* ========================================== */}
              {/* JOB LOADING */}
              {/* ========================================== */}

              {isJobsLoading && (
                <div className="interview-prep__loading">
                  <CircularProgress size={22} />

                  <span>Loading available jobs...</span>
                </div>
              )}

              {/* ========================================== */}
              {/* JOB ERROR */}
              {/* ========================================== */}

              {isJobsError && (
                <Alert severity="error" className="interview-prep__error">
                  Unable to load your jobs. Please try again.
                </Alert>
              )}

              {/* ========================================== */}
              {/* SELECTED JOB */}
              {/* ========================================== */}

              {selectedJob && (
                <div className="interview-prep__selected-job">
                  <span>Preparing for</span>

                  <strong>{selectedJob.title}</strong>

                  {selectedJob.company?.name && (
                    <small>{selectedJob.company.name}</small>
                  )}
                </div>
              )}

              {/* ========================================== */}
              {/* CHECKLIST */}
              {/* ========================================== */}

              <ul>
                <li>
                  <CheckCircleOutlined />
                  Technical and role-specific questions
                </li>

                <li>
                  <CheckCircleOutlined />
                  Follow-up questions
                </li>

                <li>
                  <CheckCircleOutlined />
                  AI-powered answer evaluation
                </li>

                <li>
                  <CheckCircleOutlined />
                  Voice interview support
                </li>
              </ul>

              {/* ========================================== */}
              {/* API ERROR */}
              {/* ========================================== */}

              {error && (
                <Alert severity="error" className="interview-prep__error">
                  Unable to generate interview preparation. Please try again.
                </Alert>
              )}

              {/* ========================================== */}
              {/* GENERATE */}
              {/* ========================================== */}

              <Button
                variant="contained"
                size="large"
                onClick={handleGeneratePrep}
                disabled={isLoading || isJobsLoading || !selectedJobId}
                endIcon={!isLoading ? <RocketLaunchOutlined /> : undefined}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} color="inherit" />
                    Generating...
                  </>
                ) : (
                  "Generate Interview Prep"
                )}
              </Button>
            </>
          ) : (
            <>
              {/* ========================================== */}
              {/* SUCCESS */}
              {/* ========================================== */}

              <div className="interview-prep__success-icon">
                <CheckCircleOutlined />
              </div>

              <h2>Your interview is ready</h2>

              <p>
                We've generated your personalized interview questions. When
                you're ready, start the interview.
              </p>

              {/* ========================================== */}
              {/* JOB INFO */}
              {/* ========================================== */}

              {selectedJob && (
                <div className="interview-prep__selected-job">
                  <span>Interview for</span>

                  <strong>{selectedJob.title}</strong>

                  {selectedJob.company?.name && (
                    <small>{selectedJob.company.name}</small>
                  )}
                </div>
              )}

              {/* ========================================== */}
              {/* SUMMARY */}
              {/* ========================================== */}

              <div className="interview-prep__summary">
                <div>
                  <strong>{prep.questions?.length || 0}</strong>

                  <span>Questions</span>
                </div>

                <div>
                  <strong>AI</strong>

                  <span>Evaluation</span>
                </div>

                <div>
                  <strong>Voice</strong>

                  <span>Supported</span>
                </div>
              </div>

              {/* ========================================== */}
              {/* START INTERVIEW */}
              {/* ========================================== */}

              <Button
                variant="contained"
                size="large"
                onClick={handleStartInterview}
                endIcon={<RocketLaunchOutlined />}
              >
                Start Interview
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default InterviewPrepPage;
