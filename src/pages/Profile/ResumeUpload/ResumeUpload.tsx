import { useRef } from "react";
import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import {
  PictureAsPdfOutlined,
  UploadFileOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

import { useUploadResumeMutation } from "../../../features/ai/aiApi";

import type { UserResume } from "../../../features/ai/types";

import "./ResumeUpload.scss";

interface ResumeUploadProps {
  resume?: UserResume | null;
}

const ResumeUpload = ({ resume }: ResumeUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [uploadResume, { isLoading }] = useUploadResumeMutation();

  const handleSelectFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // ----------------------------------------------------------
    // Validate file type
    // ----------------------------------------------------------

    if (file.type !== "application/pdf") {
      alert("Only PDF resumes are supported.");

      event.target.value = "";

      return;
    }

    // ----------------------------------------------------------
    // Validate file size
    // ----------------------------------------------------------

    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert("Resume must be smaller than 5 MB.");

      event.target.value = "";

      return;
    }

    try {
      await uploadResume(file).unwrap();
    } catch (error) {
      console.error("Resume upload failed:", error);
    } finally {
      event.target.value = "";
    }
  };

  return (
    <Paper className="resume-upload" elevation={0}>
      {/* ------------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------------ */}

      <div className="resume-upload__header">
        <div className="resume-upload__icon">
          <PictureAsPdfOutlined />
        </div>

        <div>
          <Typography className="resume-upload__title">Resume</Typography>

          <Typography className="resume-upload__description">
            Upload your latest PDF resume. This resume will be used for job
            applications and HireCoder AI features.
          </Typography>
        </div>
      </div>

      {/* ------------------------------------------------------ */}
      {/* CURRENT RESUME */}
      {/* ------------------------------------------------------ */}

      {resume ? (
        <div className="resume-upload__current">
          <div className="resume-upload__file">
            <PictureAsPdfOutlined />

            <div>
              <Typography className="resume-upload__file-name">
                {resume.fileName}
              </Typography>

              <Typography className="resume-upload__file-meta">
                PDF Resume
              </Typography>
            </div>
          </div>

          <div className="resume-upload__actions">
            {resume.fileUrl && (
              <Button
                component="a"
                href={resume.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<VisibilityOutlined />}
              >
                View Resume
              </Button>
            )}

            <Button
              variant="outlined"
              onClick={handleSelectFile}
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress size={18} />
                ) : (
                  <UploadFileOutlined />
                )
              }
            >
              {isLoading ? "Uploading..." : "Replace Resume"}
            </Button>
          </div>
        </div>
      ) : (
        /* ---------------------------------------------------- */
        /* NO RESUME */
        /* ---------------------------------------------------- */

        <div className="resume-upload__empty">
          <Typography>No resume uploaded yet.</Typography>

          <Button
            variant="contained"
            onClick={handleSelectFile}
            disabled={isLoading}
            startIcon={
              isLoading ? (
                <CircularProgress size={18} />
              ) : (
                <UploadFileOutlined />
              )
            }
          >
            {isLoading ? "Uploading..." : "Upload Resume"}
          </Button>
        </div>
      )}

      {/* ------------------------------------------------------ */}
      {/* FILE INPUT */}
      {/* ------------------------------------------------------ */}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        hidden
        onChange={handleFileChange}
      />
    </Paper>
  );
};

export default ResumeUpload;
