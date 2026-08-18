import { PsychologyOutlined } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";

import "./InterviewChance.scss";

interface InterviewChanceProps {
  chance: string;
}

const InterviewChance = ({ chance }: InterviewChanceProps) => {
  const normalizedChance = chance.trim().toLowerCase();

  const chanceClass = normalizedChance.replace(/\s+/g, "-");

  return (
    <Card
      className={`interview-chance interview-chance--${chanceClass}`}
      elevation={0}
    >
      <CardContent className="interview-chance__content">
        <div className="interview-chance__icon">
          <PsychologyOutlined />
        </div>

        <div className="interview-chance__info">
          <Typography className="interview-chance__label">
            INTERVIEW CHANCE
          </Typography>

          <Typography className="interview-chance__value">{chance}</Typography>

          <Typography className="interview-chance__description">
            Based on your current resume, experience, and overall presentation.
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewChance;
