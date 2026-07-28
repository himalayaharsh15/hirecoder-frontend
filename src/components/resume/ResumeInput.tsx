import { useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import "./ResumeInput.scss";

interface ResumeInputProps {
  onAnalyze: (resume: string) => void;
  isLoading?: boolean;
}

const ResumeInput = ({ onAnalyze, isLoading = false }: ResumeInputProps) => {
  const [resume, setResume] = useState("");

  const handleAnalyze = () => {
    if (!resume.trim()) return;

    onAnalyze(resume);
  };

  return (
    <Paper className="resume-input" elevation={0}>
      <div className="resume-input__header">
        <Typography variant="h4">AI Resume Analyzer</Typography>

        <Typography className="resume-input__subtitle">
          Paste your complete resume below and let HireCoder AI analyze it for
          ATS compatibility, strengths, weaknesses and missing skills.
        </Typography>
      </div>

      <TextField
        className="resume-input__textarea"
        placeholder="Paste your resume here..."
        multiline
        rows={18}
        fullWidth
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <div className="resume-input__footer">
        <Typography className="resume-input__count">
          {resume.length} characters
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<AutoAwesomeIcon />}
          disabled={!resume.trim() || isLoading}
          onClick={handleAnalyze}
        >
          {isLoading ? "Analyzing..." : "Analyze Resume"}
        </Button>
      </div>
    </Paper>
  );
};

export default ResumeInput;
