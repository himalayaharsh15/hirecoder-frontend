import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

import "./ScoreCard.scss";

import {
  getATSScoreStatus,
  getColor,
  getDescription,
} from "../../../utils/ats-score";

import useAnimatedCounter from "../../../hooks/useAnimatedCounter";

interface ScoreCardProps {
  score: number;
}

const ScoreCard = ({ score }: ScoreCardProps) => {
  const color = getColor(score);
  const scoreStatus = getATSScoreStatus(score);
  const description = getDescription(score);

  const animatedScore = useAnimatedCounter(score);

  return (
    <Card className="score-card" elevation={0}>
      <CardContent className="score-card__content">
        {/* ======================================================
            Title
        ====================================================== */}

        <Typography className="score-card__title">ATS SCORE</Typography>

        {/* ======================================================
            Circular Score
        ====================================================== */}

        <Box
          className="score-card__progress"
          style={
            {
              "--score-color": color,
            } as React.CSSProperties
          }
        >
          <CircularProgress
            className="score-card__progress-circle"
            variant="determinate"
            value={animatedScore}
            size={170}
            thickness={5}
          />

          <Box className="score-card__progress-value">
            <Typography className="score-card__value">
              {animatedScore}
            </Typography>

            <Typography className="score-card__max">/100</Typography>
          </Box>
        </Box>

        {/* ======================================================
            Status
        ====================================================== */}

        <Typography
          className="score-card__status"
          style={
            {
              "--score-color": color,
            } as React.CSSProperties
          }
        >
          {scoreStatus}
        </Typography>

        {/* ======================================================
            Description
        ====================================================== */}

        <Typography className="score-card__description">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
