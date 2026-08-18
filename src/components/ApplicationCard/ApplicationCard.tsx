import {
  CalendarTodayOutlined,
  DescriptionOutlined,
  EmailOutlined,
  PersonOutlined,
  WorkOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";

import "./ApplicationCard.scss";

import type { JobApplicant } from "../../features/application/application.types";

import ApplicationStatusSection from "../ApplicationStatus/ApplicationStatus";

interface ApplicationCardProps {
  application: JobApplicant;
  onView?: () => void;
}

const ApplicationCard = ({ application, onView }: ApplicationCardProps) => {
  const { candidate } = application;

  const profile = candidate.profile;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const resumeUrl = application.resumeUrl || profile?.resumeUrl;

  return (
    <article className="application-card">
      {/* ============================================================
          HEADER
      ============================================================ */}

      <div className="application-card__header">
        <div className="application-card__candidate">
          <div className="application-card__avatar">
            <PersonOutlined />
          </div>

          <div className="application-card__identity">
            <h2>{candidate.name}</h2>

            <span>
              <EmailOutlined />
              {candidate.email}
            </span>
          </div>
        </div>

        <ApplicationStatusSection status={application.status} />
      </div>

      {/* ============================================================
          DETAILS
      ============================================================ */}

      <div className="application-card__details">
        {profile?.headline && (
          <div className="application-card__detail">
            <WorkOutlined />

            <span>{profile.headline}</span>
          </div>
        )}

        {profile?.experience !== null && profile?.experience !== undefined && (
          <div className="application-card__detail">
            <WorkOutlined />

            <span>{profile.experience} years experience</span>
          </div>
        )}

        <div className="application-card__detail">
          <CalendarTodayOutlined />

          <span>Applied {formatDate(application.createdAt)}</span>
        </div>
      </div>

      {/* ============================================================
          SKILLS
      ============================================================ */}

      {profile?.skills && profile.skills.length > 0 && (
        <div className="application-card__skills">
          {profile.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      )}

      {/* ============================================================
          COVER LETTER
      ============================================================ */}

      {application.coverLetter && (
        <div className="application-card__cover-letter">
          <span>Cover Letter</span>

          <p>
            {application.coverLetter.length > 180
              ? `${application.coverLetter.slice(0, 180)}...`
              : application.coverLetter}
          </p>
        </div>
      )}

      {/* ============================================================
          FOOTER
      ============================================================ */}

      <div className="application-card__footer">
        {resumeUrl && (
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
        )}

        <Button variant="contained" onClick={onView}>
          View Application
        </Button>
      </div>
    </article>
  );
};

export default ApplicationCard;
