import { useState } from "react";
import { Button } from "@mui/material";
import { PictureAsPdfOutlined, VisibilityOutlined } from "@mui/icons-material";

import "./Profile.scss";

import { useGetMyProfileQuery } from "../../features/Profile/profileApi";

import { useGetMyResumeQuery } from "../../features/ai/aiApi";

import ProfileForm from "./ProfileForm";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMyProfileQuery();

  const { data: resumeData } = useGetMyResumeQuery();

  if (isLoading) {
    return <div className="profile">Loading profile...</div>;
  }

  const isProfileNotFound =
    isError && "status" in error && error.status === 404;

  if (isError && !isProfileNotFound) {
    return (
      <section className="profile">
        <div className="profile__container">
          <p>Unable to load your profile.</p>
        </div>
      </section>
    );
  }

  /*
   * ------------------------------------------------------------
   * CREATE PROFILE
   * ------------------------------------------------------------
   */

  if (isProfileNotFound) {
    return (
      <section className="profile">
        <div className="profile__container">
          <header className="profile__header">
            <div>
              <h1>Create Your Profile</h1>

              <p>Complete your professional profile to get started.</p>
            </div>
          </header>

          <div className="profile__form">
            <ProfileForm
              onSuccess={async () => {
                await refetch();
                setIsEditing(false);
              }}
            />
          </div>
        </div>
      </section>
    );
  }

  /*
   * ------------------------------------------------------------
   * PROFILE
   * ------------------------------------------------------------
   */

  return (
    <section className="profile">
      <div className="profile__container">
        {/* ---------------------------------------------------- */}
        {/* HEADER */}
        {/* ---------------------------------------------------- */}

        <header className="profile__header">
          <div>
            <h1>My Profile</h1>

            <p>Manage your professional information.</p>
          </div>

          {!isEditing && (
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </header>

        {/* ---------------------------------------------------- */}
        {/* EDIT MODE */}
        {/* ---------------------------------------------------- */}

        {isEditing ? (
          <div className="profile__form">
            <ProfileForm
              profile={profile}
              onSuccess={() => {
                setIsEditing(false);
              }}
            />

            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          /* -------------------------------------------------- */
          /* VIEW MODE */
          /* -------------------------------------------------- */

          <div className="profile__content">
            {/* ------------------------------------------------ */}
            {/* PROFESSIONAL INFORMATION */}
            {/* ------------------------------------------------ */}

            <div className="profile__section">
              <h2>Professional Information</h2>

              <div className="profile__field">
                <span>Headline</span>

                <p>{profile?.headline || "Not added"}</p>
              </div>

              <div className="profile__field">
                <span>Bio</span>

                <p>{profile?.bio || "Not added"}</p>
              </div>

              <div className="profile__field">
                <span>Location</span>

                <p>{profile?.location || "Not added"}</p>
              </div>

              <div className="profile__field">
                <span>Experience</span>

                <p>
                  {profile?.experience !== undefined
                    ? `${profile.experience} years`
                    : "Not added"}
                </p>
              </div>
            </div>

            {/* ------------------------------------------------ */}
            {/* SKILLS */}
            {/* ------------------------------------------------ */}

            <div className="profile__section">
              <h2>Skills</h2>

              {profile?.skills?.length ? (
                <div className="profile__skills">
                  {profile.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              ) : (
                <p>Skills not added</p>
              )}
            </div>

            {/* ------------------------------------------------ */}
            {/* LINKS */}
            {/* ------------------------------------------------ */}

            <div className="profile__section">
              <h2>Links</h2>

              <div className="profile__links">
                <p>GitHub: {profile?.githubUrl || "Not added"}</p>

                <p>LinkedIn: {profile?.linkedinUrl || "Not added"}</p>

                <p>Portfolio: {profile?.portfolioUrl || "Not added"}</p>
              </div>
            </div>

            {/* ------------------------------------------------ */}
            {/* RESUME */}
            {/* ------------------------------------------------ */}

            <div className="profile__section">
              <h2>Resume</h2>

              {resumeData?.resume ? (
                <div className="profile__resume">
                  <div className="profile__resume-info">
                    <div className="profile__resume-icon">
                      <PictureAsPdfOutlined />
                    </div>

                    <div>
                      <h3>{resumeData.resume.fileName}</h3>

                      <p>PDF Resume</p>
                    </div>
                  </div>

                  {resumeData.resume.fileUrl && (
                    <Button
                      component="a"
                      href={resumeData.resume.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      startIcon={<VisibilityOutlined />}
                    >
                      View Resume
                    </Button>
                  )}
                </div>
              ) : (
                <div className="profile__resume-empty">
                  <p>No resume uploaded yet.</p>

                  <Button variant="outlined" onClick={() => setIsEditing(true)}>
                    Upload Resume
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
