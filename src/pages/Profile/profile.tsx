import { useState } from "react";
import { Button } from "@mui/material";

import "./Profile.scss";

import { useGetMyProfileQuery } from "../../features/Profile/profileApi";

import ProfileForm from "./ProfileForm";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: profile, isLoading, isError, error } = useGetMyProfileQuery();

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
              onSuccess={() => {
                setIsEditing(false);
              }}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <header className="profile__header">
          <div>
            <h1>My Profile</h1>
            <p>Manage your professional information.</p>
          </div>

          <Button variant="contained" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        </header>

        {isEditing ? (
          <div className="profile__form">
            <ProfileForm
              profile={profile}
              onSuccess={() => setIsEditing(false)}
            />

            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="profile__content">
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

            <div className="profile__section">
              <h2>Links</h2>

              <div className="profile__links">
                <p>GitHub: {profile?.githubUrl || "Not added"}</p>

                <p>LinkedIn: {profile?.linkedinUrl || "Not added"}</p>

                <p>Portfolio: {profile?.portfolioUrl || "Not added"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
