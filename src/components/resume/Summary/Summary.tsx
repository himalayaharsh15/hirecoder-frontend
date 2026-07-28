import { Card, CardContent, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import "./Summary.scss";

interface SummaryCardProps {
  summary: string;
}

const SummaryCard = ({ summary }: SummaryCardProps) => {
  return (
    <Card className="summary-card" elevation={0}>
      <CardContent>
        <div className="summary-card__header">
          <AutoAwesomeRoundedIcon />

          <Typography variant="h5">AI Career Insight</Typography>
        </div>

        <Typography className="summary-card__description">{summary}</Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
