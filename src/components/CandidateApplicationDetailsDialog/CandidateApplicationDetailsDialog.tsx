import {
  CalendarTodayOutlined,
  BusinessCenterOutlined,
  Close,
  DescriptionOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";

import type { MyApplication } from "../../features/application/application.types";

import "./CandidateApplicationDetailsDialog.scss";

interface CandidateApplicationDetailsDialogProps {
  open: boolean;
  application: MyApplication | null;
  onClose: () => void;

  // Called when candidate clicks "Withdraw Application"
  onWithdraw?: () => void;

  // Shows loading state while withdrawal API is running
  isWithdrawing?: boolean;
}

const CandidateApplicationDetailsDialog = ({
  open,
  application,
  onClose,
  onWithdraw,
  isWithdrawing = false,
}: CandidateApplicationDetailsDialogProps) => {
  // ============================================================
  // NO APPLICATION
  // ============================================================

  if (!application) {
    return null;
  }

  const { job } = application;

  // ============================================================
  // FORMATTED DATE
  // ============================================================

  const formattedDate = new Date(application.createdAt).toLocaleDateString(
    undefined,
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  // ============================================================
  // FORMATTED STATUS
  // ============================================================

  const statusClass = application.status.toLowerCase();

  const formattedStatus = application.status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  // ============================================================
  // FORMATTED EMPLOYMENT TYPE
  // ============================================================

  const formattedEmploymentType = job.employmentType
    ? job.employmentType
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
    : null;

  // ============================================================
  // FORMATTED EXPERIENCE LEVEL
  // ============================================================

  const formattedExperienceLevel = job.experienceLevel
    ? job.experienceLevel
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
    : null;

  // ============================================================
  // WITHDRAWAL RULE
  // ============================================================
  //
  // According to the backend business rules:
  //
  // Candidate CAN withdraw:
  // APPLIED
  // UNDER_REVIEW
  // SHORTLISTED
  // INTERVIEW_SCHEDULED
  // OFFERED
  //
  // Candidate CANNOT withdraw:
  // WITHDRAWN
  // REJECTED
  // HIRED
  //
  // ============================================================

  const canWithdraw =
    application.status !== "WITHDRAWN" &&
    application.status !== "REJECTED" &&
    application.status !== "HIRED";

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      {/* ========================================================
          HEADER
      ======================================================== */}

      <DialogTitle className="candidate-application-dialog__title">
        <div>
          <span>APPLICATION DETAILS</span>

          <h2>{job.title}</h2>

          <p>{job.company.name}</p>
        </div>

        <IconButton onClick={onClose} aria-label="Close application details">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent className="candidate-application-dialog__content">
        {/* ========================================================
            APPLICATION STATUS
        ======================================================== */}

        <section className="candidate-application-dialog__status-section">
          <div>
            <span className="candidate-application-dialog__label">
              Application Status
            </span>

            <div className="candidate-application-dialog__applied-date">
              <CalendarTodayOutlined />

              <span>Applied {formattedDate}</span>
            </div>
          </div>

          <span
            className={`candidate-application-dialog__status candidate-application-dialog__status--${statusClass}`}
          >
            {formattedStatus}
          </span>
        </section>

        <Divider />

        {/* ========================================================
            JOB DETAILS
        ======================================================== */}

        <section className="candidate-application-dialog__section">
          <h3>Job Details</h3>

          <div className="candidate-application-dialog__job-details">
            {job.location && (
              <div className="candidate-application-dialog__job-detail">
                <LocationOnOutlined />

                <div>
                  <span>Location</span>

                  <strong>{job.location}</strong>
                </div>
              </div>
            )}

            {formattedEmploymentType && (
              <div className="candidate-application-dialog__job-detail">
                <BusinessCenterOutlined />

                <div>
                  <span>Employment Type</span>

                  <strong>{formattedEmploymentType}</strong>
                </div>
              </div>
            )}

            {formattedExperienceLevel && (
              <div className="candidate-application-dialog__job-detail">
                <BusinessCenterOutlined />

                <div>
                  <span>Experience Level</span>

                  <strong>{formattedExperienceLevel}</strong>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================
            COVER LETTER
        ======================================================== */}

        <section className="candidate-application-dialog__section">
          <h3>Cover Letter</h3>

          {application.coverLetter ? (
            <div className="candidate-application-dialog__cover-letter">
              {application.coverLetter}
            </div>
          ) : (
            <p className="candidate-application-dialog__empty">
              No cover letter was submitted.
            </p>
          )}
        </section>

        {/* ========================================================
            RESUME
        ======================================================== */}

        <section className="candidate-application-dialog__section">
          <h3>Resume</h3>

          {application.resumeUrl ? (
            <Button
              variant="outlined"
              startIcon={<DescriptionOutlined />}
              component="a"
              href={application.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </Button>
          ) : (
            <p className="candidate-application-dialog__empty">
              No resume was submitted with this application.
            </p>
          )}
        </section>

        {/* ========================================================
            FOOTER ACTIONS
        ======================================================== */}

        <div className="candidate-application-dialog__footer">
          {/* ------------------------------------------------------
              WITHDRAW APPLICATION

              This button will NOT appear for:
              - REJECTED
              - HIRED
              - WITHDRAWN
          ------------------------------------------------------ */}

          {canWithdraw && onWithdraw && (
            <Button
              variant="outlined"
              color="error"
              onClick={onWithdraw}
              disabled={isWithdrawing}
            >
              {isWithdrawing ? "Withdrawing..." : "Withdraw Application"}
            </Button>
          )}

          {/* ------------------------------------------------------
              CLOSE
          ------------------------------------------------------ */}

          <Button variant="outlined" onClick={onClose} disabled={isWithdrawing}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateApplicationDetailsDialog;
