import {
  AutoAwesome,
  PsychologyOutlined,
  QuestionAnswerOutlined,
} from "@mui/icons-material";

import { Card, CardContent, Chip, Typography } from "@mui/material";

import type {
  InterviewPrep,
  InterviewQuestion,
} from "../../../features/ai/types";

import "./InterviewPrepResult.scss";

interface InterviewPrepResultProps {
  prep: InterviewPrep;
}

const getDifficultyClass = (difficulty: InterviewQuestion["difficulty"]) => {
  switch (difficulty) {
    case "Easy":
      return "easy";

    case "Medium":
      return "medium";

    case "Hard":
      return "hard";

    default:
      return "medium";
  }
};

const InterviewPrepResult = ({ prep }: InterviewPrepResultProps) => {
  return (
    <section className="interview-prep">
      {/* ======================================================
          Header
      ====================================================== */}

      <div className="interview-prep__header">
        <span className="interview-prep__eyebrow">AI INTERVIEW COACH</span>

        <div className="interview-prep__title-row">
          <div>
            <Typography component="h2" className="interview-prep__title">
              Interview Preparation
            </Typography>

            <Typography className="interview-prep__subtitle">
              Questions generated specifically from your resume and this job
              description.
            </Typography>
          </div>

          <Chip
            icon={<AutoAwesome />}
            label={`${prep.questions.length} Questions`}
            className="interview-prep__count-chip"
          />
        </div>
      </div>

      {/* ======================================================
          Questions
      ====================================================== */}

      <div className="interview-prep__questions">
        {prep.questions.map((question, index) => (
          <Card
            key={`${question.question}-${index}`}
            className="interview-prep__question-card"
            elevation={0}
          >
            <CardContent>
              <div className="interview-prep__question-top">
                <div className="interview-prep__question-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="interview-prep__question-meta">
                  <Chip
                    label={question.category}
                    size="small"
                    className="interview-prep__category-chip"
                  />

                  <Chip
                    label={question.difficulty}
                    size="small"
                    className={`interview-prep__difficulty-chip interview-prep__difficulty-chip--${getDifficultyClass(
                      question.difficulty,
                    )}`}
                  />
                </div>
              </div>

              <Typography component="h3" className="interview-prep__question">
                {question.question}
              </Typography>

              {/* ==================================================
                  Why Asked
              ================================================== */}

              <div className="interview-prep__why">
                <div className="interview-prep__why-icon">
                  <PsychologyOutlined />
                </div>

                <div>
                  <Typography className="interview-prep__why-title">
                    Why they're asking
                  </Typography>

                  <Typography className="interview-prep__why-text">
                    {question.whyAsked}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ======================================================
          Practice CTA
      ====================================================== */}

      <Card className="interview-prep__practice-card" elevation={0}>
        <CardContent>
          <div className="interview-prep__practice-content">
            <div className="interview-prep__practice-icon">
              <QuestionAnswerOutlined />
            </div>

            <div>
              <Typography className="interview-prep__practice-title">
                Ready to practice?
              </Typography>

              <Typography className="interview-prep__practice-text">
                Answer these questions out loud before your interview. We'll add
                AI answer evaluation next.
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default InterviewPrepResult;
