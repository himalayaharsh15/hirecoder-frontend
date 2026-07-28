import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
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
  let color: string = getColor(score);
  let scoreStatus: string = getATSScoreStatus(score);
  let description: string = getDescription(score);
  const animatedScore = useAnimatedCounter(score);
  return (
    <Card className="score-card" elevation={0}>
      <CardContent>
        <Typography className="score-card__title">ATS SCORE</Typography>

        <Box className="score-card__progress">
          <CircularProgress
            variant="determinate"
            value={animatedScore}
            size={150}
            thickness={4}
            sx={{
              color: color,
            }}
          />

          <Typography className="score-card__value">
            {animatedScore}%
          </Typography>
        </Box>

        <Typography
          className="score-card__status"
          sx={{
            color: color,
          }}
        >
          {scoreStatus}
        </Typography>

        <Typography className="score-card__description">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
