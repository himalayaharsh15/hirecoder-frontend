import {
  AutoAwesome,
  CheckCircleOutlined,
  LightbulbOutlined,
  PsychologyOutlined,
  SchoolOutlined,
  TrendingUp,
  WarningAmberOutlined,
} from "@mui/icons-material";

import { Button, Card, CardContent, Chip, Typography } from "@mui/material";

import type { JobMatch } from "../../../features/ai/types";

import "./JobMatchResult.scss";

interface JobMatchResultProps {
  result: JobMatch;
  onPrepareInterview: () => void;
  isPreparingInterview?: boolean;
}

const getMatchStatus = (score: number) => {
  if (score >= 80) {
    return {
      label: "Strong Match",
      className: "strong",
    };
  }

  if (score >= 60) {
    return {
      label: "Good Match",
      className: "good",
    };
  }

  if (score >= 40) {
    return {
      label: "Partial Match",
      className: "partial",
    };
  }

  return {
    label: "Low Match",
    className: "low",
  };
};

const JobMatchResult = ({
  result,
  onPrepareInterview,
  isPreparingInterview = false,
}: JobMatchResultProps) => {
  const matchStatus = getMatchStatus(result.matchScore);

  return (
    <section className="job-match-result">
      {/* ======================================================
          Header
      ====================================================== */}

      <div className="job-match-result__header">
        <span className="job-match-result__eyebrow">AI CAREER ASSISTANT</span>

        <div className="job-match-result__title-row">
          <div>
            <Typography component="h2" className="job-match-result__title">
              Your Job Match
            </Typography>

            <Typography className="job-match-result__subtitle">
              See how well your resume matches this position.
            </Typography>
          </div>

          <Chip
            icon={<PsychologyOutlined />}
            label="HireCoder AI"
            className="job-match-result__ai-chip"
          />
        </div>
      </div>

      {/* ======================================================
          Match Score
      ====================================================== */}

      <Card
        className={`job-match-result__score-card job-match-result__score-card--${matchStatus.className}`}
        elevation={0}
      >
        <CardContent>
          <div className="job-match-result__score-content">
            <div className="job-match-result__score-circle">
              <div className="job-match-result__score-value">
                {result.matchScore}
              </div>

              <div className="job-match-result__score-max">/100</div>
            </div>

            <div className="job-match-result__score-info">
              <span className="job-match-result__score-label">
                JOB MATCH SCORE
              </span>

              <Typography className="job-match-result__score-status">
                {matchStatus.label}
              </Typography>

              <Typography className="job-match-result__score-description">
                Your resume was compared with the requirements and
                responsibilities of this job.
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ======================================================
          Skills
      ====================================================== */}

      <div className="job-match-result__skills">
        {/* Matched Skills */}

        <Card className="job-match-result__card" elevation={0}>
          <CardContent>
            <div className="job-match-result__card-header">
              <div className="job-match-result__card-icon job-match-result__card-icon--success">
                <CheckCircleOutlined />
              </div>

              <div>
                <Typography className="job-match-result__card-title">
                  Matched Skills
                </Typography>

                <Typography className="job-match-result__card-subtitle">
                  Skills that align with this job
                </Typography>
              </div>
            </div>

            <div className="job-match-result__chips">
              {result.matchedSkills.length > 0 ? (
                result.matchedSkills.map((skill, index) => (
                  <Chip
                    key={`${skill}-${index}`}
                    label={skill}
                    className="job-match-result__skill-chip job-match-result__skill-chip--matched"
                  />
                ))
              ) : (
                <Typography className="job-match-result__empty">
                  No matching skills identified.
                </Typography>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Missing Skills */}

        <Card className="job-match-result__card" elevation={0}>
          <CardContent>
            <div className="job-match-result__card-header">
              <div className="job-match-result__card-icon job-match-result__card-icon--warning">
                <WarningAmberOutlined />
              </div>

              <div>
                <Typography className="job-match-result__card-title">
                  Missing Skills
                </Typography>

                <Typography className="job-match-result__card-subtitle">
                  Important skills not demonstrated
                </Typography>
              </div>
            </div>

            <div className="job-match-result__chips">
              {result.missingSkills.length > 0 ? (
                result.missingSkills.map((skill, index) => (
                  <Chip
                    key={`${skill}-${index}`}
                    label={skill}
                    className="job-match-result__skill-chip job-match-result__skill-chip--missing"
                  />
                ))
              ) : (
                <Typography className="job-match-result__empty">
                  No significant missing skills identified.
                </Typography>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ======================================================
          Experience Match
      ====================================================== */}

      <Card className="job-match-result__experience" elevation={0}>
        <CardContent>
          <div className="job-match-result__experience-content">
            <div className="job-match-result__card-icon job-match-result__card-icon--primary">
              <TrendingUp />
            </div>

            <div>
              <Typography className="job-match-result__card-title">
                Experience Match
              </Typography>

              <Typography className="job-match-result__card-subtitle">
                How your demonstrated experience compares with this role.
              </Typography>
            </div>

            <Chip
              label={
                result.experienceMatch ? "Experience Match" : "Experience Gap"
              }
              className={
                result.experienceMatch
                  ? "job-match-result__experience-chip job-match-result__experience-chip--success"
                  : "job-match-result__experience-chip job-match-result__experience-chip--warning"
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* ======================================================
          Interview Topics
      ====================================================== */}

      <Card className="job-match-result__card" elevation={0}>
        <CardContent>
          <div className="job-match-result__card-header">
            <div className="job-match-result__card-icon job-match-result__card-icon--purple">
              <SchoolOutlined />
            </div>

            <div>
              <Typography className="job-match-result__card-title">
                Interview Topics
              </Typography>

              <Typography className="job-match-result__card-subtitle">
                Topics you should prepare for this role
              </Typography>
            </div>
          </div>

          {result.interviewTopics.length > 0 ? (
            <div className="job-match-result__list">
              {result.interviewTopics.map((topic, index) => (
                <div
                  className="job-match-result__list-item"
                  key={`${topic}-${index}`}
                >
                  <span>{index + 1}</span>

                  <Typography>{topic}</Typography>
                </div>
              ))}
            </div>
          ) : (
            <Typography className="job-match-result__empty">
              No specific interview topics were identified.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* ======================================================
          Recommendations
      ====================================================== */}

      <Card className="job-match-result__card" elevation={0}>
        <CardContent>
          <div className="job-match-result__card-header">
            <div className="job-match-result__card-icon job-match-result__card-icon--yellow">
              <LightbulbOutlined />
            </div>

            <div>
              <Typography className="job-match-result__card-title">
                Recommendations
              </Typography>

              <Typography className="job-match-result__card-subtitle">
                What you can improve before applying
              </Typography>
            </div>
          </div>

          {result.recommendations.length > 0 ? (
            <div className="job-match-result__recommendations">
              {result.recommendations.map((recommendation, index) => (
                <div
                  className="job-match-result__recommendation"
                  key={`${recommendation}-${index}`}
                >
                  <CheckCircleOutlined />

                  <Typography>{recommendation}</Typography>
                </div>
              ))}
            </div>
          ) : (
            <Typography className="job-match-result__empty">
              No additional recommendations.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* ======================================================
    Interview Preparation CTA
====================================================== */}

      <Card className="job-match-result__interview-cta" elevation={0}>
        <CardContent>
          <div className="job-match-result__interview-cta-content">
            <div className="job-match-result__interview-cta-icon">
              <AutoAwesome />
            </div>

            <div className="job-match-result__interview-cta-info">
              <Typography className="job-match-result__interview-cta-title">
                Prepare for This Interview
              </Typography>

              <Typography className="job-match-result__interview-cta-description">
                Get interview questions generated specifically from your resume
                and this job description.
              </Typography>
            </div>

            <Button
              variant="contained"
              size="large"
              startIcon={<AutoAwesome />}
              className="job-match-result__interview-cta-button"
              onClick={onPrepareInterview}
              disabled={isPreparingInterview}
            >
              {isPreparingInterview
                ? "Preparing..."
                : "Prepare Me for This Interview"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ======================================================
          AI Summary
      ====================================================== */}

      <Card className="job-match-result__summary" elevation={0}>
        <CardContent>
          <div className="job-match-result__summary-header">
            <PsychologyOutlined />

            <div>
              <Typography className="job-match-result__summary-label">
                AI RECRUITER SUMMARY
              </Typography>

              <Typography className="job-match-result__summary-title">
                Recruiter's Assessment
              </Typography>
            </div>
          </div>

          <Typography className="job-match-result__summary-text">
            {result.summary}
          </Typography>
        </CardContent>
      </Card>
    </section>
  );
};

export default JobMatchResult;
