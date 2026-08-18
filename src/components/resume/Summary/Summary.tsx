import { AutoAwesomeOutlined } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";

import "./Summary.scss";

interface SummaryProps {
  summary: string;
}

const Summary = ({ summary }: SummaryProps) => {
  return (
    <Card className="resume-summary" elevation={0}>
      <CardContent>
        <div className="resume-summary__header">
          <div className="resume-summary__icon">
            <AutoAwesomeOutlined />
          </div>

          <div>
            <Typography className="resume-summary__label">
              AI RECRUITER SUMMARY
            </Typography>

            <Typography className="resume-summary__title">
              Recruiter's Assessment
            </Typography>
          </div>
        </div>

        <Typography className="resume-summary__text">{summary}</Typography>
      </CardContent>
    </Card>
  );
};

export default Summary;
