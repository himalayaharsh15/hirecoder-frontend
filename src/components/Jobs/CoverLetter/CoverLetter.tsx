import { useEffect, useState } from "react";

import { AutoAwesome, ContentCopy, Refresh } from "@mui/icons-material";

import {
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import { useGenerateCoverLetterMutation } from "../../../features/ai/aiApi";

import "./CoverLetter.scss";

interface CoverLetterProps {
  jobId: string;
  onUseLetter?: (coverLetter: string) => void;
}

const CoverLetter = ({ jobId, onUseLetter }: CoverLetterProps) => {
  const [generateCoverLetter, { isLoading }] = useGenerateCoverLetterMutation();

  const [coverLetter, setCoverLetter] = useState("");

  const [hasGenerated, setHasGenerated] = useState(false);

  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    try {
      const result = await generateCoverLetter(jobId).unwrap();

      setCoverLetter(result.coverLetter);
      setHasGenerated(true);
    } catch (error) {
      console.error("Cover letter generation failed:", error);
    }
  };

  const handleCopy = async () => {
    if (!coverLetter) {
      return;
    }

    try {
      await navigator.clipboard.writeText(coverLetter);

      setCopied(true);
    } catch (error) {
      console.error("Failed to copy cover letter:", error);
    }
  };

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [copied]);

  return (
    <>
      <Paper className="cover-letter" elevation={0}>
        <div className="cover-letter__header">
          <div>
            <span className="cover-letter__eyebrow">AI ASSISTANT</span>

            <Typography component="h2" className="cover-letter__title">
              AI Cover Letter
            </Typography>

            <Typography className="cover-letter__subtitle">
              Generate a personalized cover letter based on your resume and this
              job.
            </Typography>
          </div>

          <AutoAwesome className="cover-letter__icon" />
        </div>

        {!hasGenerated && (
          <div className="cover-letter__empty">
            <AutoAwesome />

            <Typography>
              Let HireCoder AI create a personalized cover letter for this
              position.
            </Typography>

            <Button
              variant="contained"
              startIcon={
                isLoading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <AutoAwesome />
                )
              }
              onClick={handleGenerate}
              disabled={isLoading}
              className="cover-letter__generate"
            >
              {isLoading ? "Generating..." : "Generate Cover Letter"}
            </Button>
          </div>
        )}

        {hasGenerated && (
          <>
            <TextField
              fullWidth
              multiline
              minRows={14}
              value={coverLetter}
              onChange={(event) => setCoverLetter(event.target.value)}
              className="cover-letter__textarea"
              helperText="You can edit the AI-generated cover letter before using it."
            />

            <div className="cover-letter__actions">
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={handleGenerate}
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Regenerate"}
              </Button>

              <Button
                variant="outlined"
                startIcon={<ContentCopy />}
                onClick={handleCopy}
              >
                Copy
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  console.log("USE LETTER CLICKED");
                  console.log("Generated letter:", coverLetter);

                  onUseLetter?.(coverLetter);
                }}
                disabled={!coverLetter.trim()}
              >
                Use This Letter
              </Button>
            </div>
          </>
        )}
      </Paper>

      <Snackbar
        open={copied}
        message="Cover letter copied to clipboard."
        autoHideDuration={2000}
      />
    </>
  );
};

export default CoverLetter;
