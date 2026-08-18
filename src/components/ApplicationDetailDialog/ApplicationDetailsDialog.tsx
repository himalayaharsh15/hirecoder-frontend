import {
  Close,
  DescriptionOutlined,
  EmailOutlined,
  PersonOutlined,
  WorkOutlined,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";

import ApplicationStatusComponent from "../ApplicationStatus/ApplicationStatus";

import "./ApplicationDetailsDialog.scss";
import type {
  ApplicationStatus,
  JobApplicant,
} from "../../features/application/application.types";

interface ApplicationDetailsDialogProps {
  open: boolean;
  application: JobApplicant | null;
  onClose: () => void;
  onStatusChange?: (status: ApplicationStatus) => void;
  isUpdatingStatus?: boolean;
}

const ApplicationDetailsDialog = ({
  open,
  application,
  onClose,
  onStatusChange,
  isUpdatingStatus = false,
}: ApplicationDetailsDialogProps) => {
  if (!application) {
    return null;
  }

  const candidate = application.candidate;
  const profile = candidate.profile;

  const resumeUrl = application.resumeUrl || profile?.resumeUrl;

  const formattedDate = new Date(application.createdAt).toLocaleDateString(
    undefined,
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className="application-details-dialog__title">
        <div>
          <span>APPLICATION DETAILS</span>

          <h2>{candidate.name}</h2>
        </div>

        <IconButton onClick={onClose} aria-label="Close">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent className="application-details-dialog__content">
        {/* Candidate */}
        <section className="application-details-dialog__candidate">
          <div className="application-details-dialog__avatar">
            <PersonOutlined />
          </div>

          <div className="application-details-dialog__candidate-info">
            <h3>{candidate.name}</h3>

            <p>
              <EmailOutlined />
              {candidate.email}
            </p>

            {profile?.headline && (
              <p>
                <WorkOutlined />
                {profile.headline}
              </p>
            )}
          </div>
        </section>

        <Divider />

        {/* Status */}
        <section className="application-details-dialog__section">
          <div className="application-details-dialog__section-header">
            <div>
              <h3>Application Status</h3>

              <p>Applied on {formattedDate}</p>
            </div>

            <ApplicationStatusComponent
              status={application.status}
              editable
              disabled={isUpdatingStatus}
              onChange={onStatusChange}
            />
          </div>
        </section>

        {/* Candidate profile */}
        <section className="application-details-dialog__section">
          <h3>Candidate Profile</h3>

          <div className="application-details-dialog__profile">
            {profile?.headline && (
              <div>
                <span>Headline</span>
                <strong>{profile.headline}</strong>
              </div>
            )}

            {profile?.experience && (
              <div>
                <span>Experience</span>
                <strong>{profile.experience}</strong>
              </div>
            )}
          </div>

          {profile?.skills && profile.skills.length > 0 && (
            <div className="application-card__skills">
              {profile.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          )}
        </section>

        {/* Cover letter */}
        <section className="application-details-dialog__section">
          <h3>Cover Letter</h3>

          {application.coverLetter ? (
            <div className="application-details-dialog__cover-letter">
              {application.coverLetter}
            </div>
          ) : (
            <p className="application-details-dialog__empty">
              No cover letter was submitted.
            </p>
          )}
        </section>

        {/* Resume */}
        <section className="application-details-dialog__section">
          <h3>Resume</h3>

          {resumeUrl ? (
            <Button
              variant="outlined"
              startIcon={<DescriptionOutlined />}
              component="a"
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </Button>
          ) : (
            <p className="application-details-dialog__empty">
              No resume available.
            </p>
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsDialog;
