import { useRef, useState } from "react";

import { CloudUploadOutlined, DescriptionOutlined } from "@mui/icons-material";
import { Alert, CircularProgress } from "@mui/material";

interface ResumeUploadCardProps {
  onUpload: (file: File) => Promise<void>;
  onAnalyze: () => Promise<void>;
  isUploading: boolean;
  isReviewing: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ResumeUploadCard = ({
  onUpload,
  onAnalyze,
  isUploading,
  isReviewing,
}: ResumeUploadCardProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploaded, setUploaded] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setError(null);
    setUploaded(false);

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      setSelectedFile(null);
      setError("Please select a PDF file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setError("Resume must be smaller than 5 MB.");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select your resume first.");
      return;
    }

    try {
      setError(null);

      await onUpload(selectedFile);

      setUploaded(true);
    } catch (error) {
      console.error(error);

      setError("Unable to upload your resume. Please try again.");
    }
  };

  return (
    <div className="resume-upload-card">
      <div className="resume-upload-card__icon">
        <CloudUploadOutlined />
      </div>

      <div className="resume-upload-card__content">
        <h2>
          {uploaded ? "Resume uploaded successfully" : "Upload your resume"}
        </h2>

        <p>Upload your latest resume in PDF format.</p>

        <span className="resume-upload-card__hint">
          PDF only • Maximum size 5 MB
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        hidden
        onChange={handleFileChange}
      />

      <button
        type="button"
        className="resume-upload-card__choose"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading || isReviewing}
      >
        Choose PDF
      </button>

      {selectedFile && (
        <div className="resume-upload-card__file">
          <DescriptionOutlined />

          <div>
            <strong>{selectedFile.name}</strong>

            <span>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
          </div>
        </div>
      )}

      {selectedFile && !uploaded && (
        <button
          type="button"
          className="resume-upload-card__upload"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <CircularProgress size={18} />
              Uploading...
            </>
          ) : (
            "Upload Resume"
          )}
        </button>
      )}

      {uploaded && (
        <button
          type="button"
          className="resume-upload-card__analyze"
          onClick={onAnalyze}
          disabled={isReviewing}
        >
          {isReviewing ? (
            <>
              <CircularProgress size={18} />
              Analyzing Resume...
            </>
          ) : (
            "Analyze Resume"
          )}
        </button>
      )}

      {error && (
        <Alert severity="error" className="resume-upload-card__alert">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default ResumeUploadCard;
