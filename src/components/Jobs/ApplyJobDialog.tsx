import { useState } from "react";

import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";

import { Business, CheckCircleOutlined } from "@mui/icons-material";

import "./ApplyJobDialog.scss";

interface ApplyJobDialogProps {
  open: boolean;
  jobTitle: string;
  companyName: string;
  companyLogoUrl?: string | null;
  isApplying: boolean;
  onClose: () => void;
  onSubmit: (coverLetter?: string) => Promise<void>;
}

const ApplyJobDialog = ({
  open,
  jobTitle,
  companyName,
  companyLogoUrl,
  isApplying,
  onClose,
  onSubmit,
}: ApplyJobDialogProps) => {
  const [coverLetter, setCoverLetter] = useState("");

  const handleClose = () => {
    if (isApplying) {
      return;
    }

    setCoverLetter("");
    onClose();
  };

  const handleSubmit = async () => {
    await onSubmit(coverLetter.trim() || undefined);

    setCoverLetter("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      className="apply-job-dialog"
    >
      <DialogTitle className="apply-job-dialog__title">
        Apply for this position
      </DialogTitle>

      <DialogContent className="apply-job-dialog__content">
        {/* -------------------------------------------------------------- */}
        {/* JOB */}
        {/* -------------------------------------------------------------- */}

        <div className="apply-job-dialog__job">
          <div className="apply-job-dialog__logo">
            {companyLogoUrl ? (
              <img src={companyLogoUrl} alt={`${companyName} logo`} />
            ) : (
              <Business />
            )}
          </div>

          <div className="apply-job-dialog__job-info">
            <h3>{jobTitle}</h3>

            <p>{companyName}</p>
          </div>
        </div>

        <Divider />

        {/* -------------------------------------------------------------- */}
        {/* INTRO */}
        {/* -------------------------------------------------------------- */}

        <div className="apply-job-dialog__intro">
          <CheckCircleOutlined />

          <div>
            <strong>You're almost there!</strong>

            <p>
              Submit your application with a short cover letter to introduce
              yourself to the employer.
            </p>
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* COVER LETTER */}
        {/* -------------------------------------------------------------- */}

        <TextField
          label="Cover Letter"
          placeholder="Tell the employer why you're a good fit for this role..."
          multiline
          rows={7}
          fullWidth
          value={coverLetter}
          onChange={(event) => setCoverLetter(event.target.value)}
          disabled={isApplying}
          slotProps={{
            htmlInput: {
              maxLength: 5000,
            },
          }}
          helperText={`${coverLetter.length}/5000`}
        />

        {/* -------------------------------------------------------------- */}
        {/* PROFILE NOTE */}
        {/* -------------------------------------------------------------- */}

        <Alert severity="info">
          Your HireCoder profile will be used with this application.
        </Alert>
      </DialogContent>

      {/* -------------------------------------------------------------- */}
      {/* ACTIONS */}
      {/* -------------------------------------------------------------- */}

      <DialogActions className="apply-job-dialog__actions">
        <Button variant="text" onClick={handleClose} disabled={isApplying}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isApplying}
        >
          {isApplying ? (
            <>
              <CircularProgress size={18} sx={{ mr: 1 }} />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyJobDialog;
