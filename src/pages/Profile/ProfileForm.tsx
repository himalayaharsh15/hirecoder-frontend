import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  useCreateOrUpdateProfileMutation,
  type CreateProfileRequest,
} from "../../features/Profile/profileApi";

import "./ProfileForm.scss";
import ResumeUpload from "./ResumeUpload/ResumeUpload";
import { useGetMyResumeQuery } from "../../features/ai/aiApi";

interface ProfileFormProps {
  profile?: CreateProfileRequest;
  onSuccess: () => void;
}

const ProfileForm = ({ profile, onSuccess }: ProfileFormProps) => {
  const [createOrUpdateProfile, { isLoading }] =
    useCreateOrUpdateProfileMutation();

  const { data: resumeData } = useGetMyResumeQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProfileRequest>({
    defaultValues: {
      headline: profile?.headline ?? "",
      location: profile?.location ?? "",
      experience: profile?.experience ?? 0,
      skills: profile?.skills ?? [],
      bio: profile?.bio ?? "",
      githubUrl: profile?.githubUrl ?? "",
      linkedinUrl: profile?.linkedinUrl ?? "",
      portfolioUrl: profile?.portfolioUrl ?? "",
    },
  });

  const onSubmit = async (data: CreateProfileRequest) => {
    try {
      await createOrUpdateProfile(data).unwrap();

      onSuccess();
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="profile-form__grid">
        <TextField
          label="Professional Headline"
          fullWidth
          {...register("headline")}
          error={!!errors.headline}
          helperText={errors.headline?.message}
        />

        <TextField
          label="Location"
          fullWidth
          {...register("location")}
          error={!!errors.location}
          helperText={errors.location?.message}
        />

        <TextField
          label="Years of Experience"
          type="number"
          fullWidth
          {...register("experience", {
            valueAsNumber: true,
          })}
          error={!!errors.experience}
          helperText={errors.experience?.message}
        />

        <TextField
          label="Skills"
          fullWidth
          placeholder="React, TypeScript, NestJS"
          {...register("skills", {
            setValueAs: (value) => {
              if (Array.isArray(value)) {
                return value;
              }

              if (typeof value === "string") {
                return value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean);
              }

              return [];
            },
          })}
        />
      </div>

      <TextField
        label="Bio"
        fullWidth
        multiline
        rows={5}
        {...register("bio")}
        error={!!errors.bio}
        helperText={errors.bio?.message}
      />

      <div className="profile-form__links">
        <h3>Professional Links</h3>

        <TextField label="GitHub URL" fullWidth {...register("githubUrl")} />

        <TextField
          label="LinkedIn URL"
          fullWidth
          {...register("linkedinUrl")}
        />

        <TextField
          label="Portfolio URL"
          fullWidth
          {...register("portfolioUrl")}
        />

        <ResumeUpload resume={resumeData?.resume} />
      </div>

      <div className="profile-form__actions">
        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
