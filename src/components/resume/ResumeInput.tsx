import { useRef, useState } from "react";

import { Alert, Button, Paper, Typography } from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import "./ResumeInput.scss";

interface ResumeInputProps {
  onUpload: (file: File) => Promise<void>;
  onAnalyze: () => void;
  isUploading?: boolean;
  isAnalyzing?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ResumeInput = ({
  onUpload,
  onAnalyze,
  isUploading = false,
  isAnalyzing = false,
}: ResumeInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isUploaded, setIsUploaded] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // ============================================================
  // Select PDF
  // ============================================================

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setError(null);
    setIsUploaded(false);

    if (!file) {
      return;
    }

    // ==========================================================
    // Validate file type
    // ==========================================================

    if (file.type !== "application/pdf") {
      setSelectedFile(null);

      setError("Please select a PDF resume.");

      return;
    }

    // ==========================================================
    // Validate file size
    // ==========================================================

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);

      setError("Resume must be smaller than 5 MB.");

      return;
    }

    setSelectedFile(file);
  };

  // ============================================================
  // Upload PDF
  // ============================================================

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select your resume first.");

      return;
    }

    try {
      setError(null);

      await onUpload(selectedFile);

      setIsUploaded(true);
    } catch (uploadError) {
      console.error("Resume upload failed:", uploadError);

      setError("Unable to upload your resume. Please try again.");
    }
  };

  // ============================================================
  // Open file picker
  // ============================================================

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <Paper className="resume-input" elevation={0}>
      {/* ========================================================
          Header
      ======================================================== */}

      <div className="resume-input__header">
        <div className="resume-input__icon">
          <CloudUploadOutlinedIcon />
        </div>

        <div>
          <Typography variant="h4">AI Resume Analyzer</Typography>

          <Typography className="resume-input__subtitle">
            Upload your resume and let HireCoder AI analyze your ATS
            compatibility, strengths, weaknesses and missing skills.
          </Typography>
        </div>
      </div>

      {/* ========================================================
          Hidden PDF input
      ======================================================== */}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        hidden
        onChange={handleFileChange}
      />

      {/* ========================================================
          Upload Area
      ======================================================== */}

      <div
        className="resume-input__dropzone"
        onClick={handleChooseFile}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            handleChooseFile();
          }
        }}
      >
        <div className="resume-input__upload-icon">
          <CloudUploadOutlinedIcon />
        </div>

        <Typography className="resume-input__dropzone-title">
          Upload your resume
        </Typography>

        <Typography className="resume-input__dropzone-text">
          Click here to choose your PDF resume
        </Typography>

        <Typography className="resume-input__hint">
          PDF only • Maximum file size 5 MB
        </Typography>
      </div>

      {/* ========================================================
          Selected File
      ======================================================== */}

      {selectedFile && (
        <div className="resume-input__file">
          <div className="resume-input__file-icon">
            <DescriptionOutlinedIcon />
          </div>

          <div className="resume-input__file-info">
            <Typography className="resume-input__file-name">
              {selectedFile.name}
            </Typography>

            <Typography className="resume-input__file-size">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </Typography>
          </div>

          {isUploaded && (
            <span className="resume-input__uploaded">Uploaded</span>
          )}
        </div>
      )}

      {/* ========================================================
          Footer / Actions
      ======================================================== */}

      <div className="resume-input__footer">
        <Typography className="resume-input__count">
          {selectedFile ? "PDF resume selected" : "No resume selected"}
        </Typography>

        <div className="resume-input__actions">
          <Button
            variant="outlined"
            size="large"
            onClick={handleChooseFile}
            disabled={isUploading || isAnalyzing}
          >
            Choose PDF
          </Button>

          {!isUploaded ? (
            <Button
              variant="contained"
              size="large"
              startIcon={<CloudUploadOutlinedIcon />}
              disabled={!selectedFile || isUploading || isAnalyzing}
              onClick={handleUpload}
            >
              {isUploading ? "Uploading..." : "Upload Resume"}
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              startIcon={<AutoAwesomeIcon />}
              disabled={isAnalyzing}
              onClick={onAnalyze}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
            </Button>
          )}
        </div>
      </div>

      {/* ========================================================
          Error
      ======================================================== */}

      {error && (
        <Alert severity="error" className="resume-input__alert">
          {error}
        </Alert>
      )}

      {/* ========================================================
          Success
      ======================================================== */}

      {isUploaded && !error && (
        <Alert severity="success" className="resume-input__alert">
          Resume uploaded successfully. You can now analyze it using HireCoder
          AI.
        </Alert>
      )}
    </Paper>
  );
};

export default ResumeInput;
