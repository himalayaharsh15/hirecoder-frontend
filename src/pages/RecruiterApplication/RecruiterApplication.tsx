import { useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import { ArrowBack, PersonOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

import "./RecruiterApplication.scss";
import type {
  ApplicationStatus,
  JobApplicant,
} from "../../features/application/application.types";
import {
  useGetJobApplicantsQuery,
  useUpdateApplicationStatusMutation,
} from "../../features/application/applicationApi";
import ApplicationCard from "../../components/ApplicationCard/ApplicationCard";
import ApplicationDetailsDialog from "../../components/ApplicationDetailDialog/ApplicationDetailsDialog";

const RecruiterApplications = () => {
  const navigate = useNavigate();

  const { jobId } = useParams<{
    jobId: string;
  }>();

  const [selectedApplication, setSelectedApplication] =
    useState<JobApplicant | null>(null);

  const { data, isLoading, isError, error } = useGetJobApplicantsQuery(
    {
      jobId: jobId as string,
      page: 1,
      limit: 10,
    },
    {
      skip: !jobId,
    },
  );

  const [updateApplicationStatus, { isLoading: isUpdatingStatus }] =
    useUpdateApplicationStatusMutation();

  const applicants = data?.applicants ?? [];

  const handleViewApplication = (application: JobApplicant) => {
    setSelectedApplication(application);
  };

  const handleCloseDialog = () => {
    setSelectedApplication(null);
  };

  const handleStatusChange = async (status: ApplicationStatus) => {
    if (!selectedApplication || !jobId) {
      return;
    }

    try {
      const response = await updateApplicationStatus({
        applicationId: selectedApplication.id,
        status,
        jobId,
      }).unwrap();

      setSelectedApplication((currentApplication) => {
        if (!currentApplication) {
          return null;
        }

        return {
          ...currentApplication,
          status: response.application.status,
        };
      });
    } catch (error) {
      console.error("Failed to update application status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="recruiter-applications recruiter-applications--loading">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    console.error("Failed to load applications:", error);

    return (
      <div className="recruiter-applications">
        <div className="recruiter-applications__container">
          <Alert severity="error">
            Unable to load applications. Please try again.
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <section className="recruiter-applications">
      <div className="recruiter-applications__container">
        {/* Back button */}
        <button
          type="button"
          className="recruiter-applications__back"
          onClick={() => navigate("/recruiter/jobs")}
        >
          <ArrowBack />
          <span>Back to My Jobs</span>
        </button>

        {/* Header */}
        <header className="recruiter-applications__header">
          <div>
            <span className="recruiter-applications__eyebrow">
              RECRUITER CENTER
            </span>

            <h1>Applications</h1>

            <p>Review and manage candidates who applied to this job.</p>
          </div>

          <div className="recruiter-applications__count">
            <strong>{data?.pagination.total ?? 0}</strong>

            <span>Applications</span>
          </div>
        </header>

        {/* Empty state */}
        {applicants.length === 0 ? (
          <div className="recruiter-applications__empty">
            <div className="recruiter-applications__empty-icon">
              <PersonOutlined />
            </div>

            <h2>No applications yet</h2>

            <p>Candidates who apply to this job will appear here.</p>
          </div>
        ) : (
          /* Applications */
          <div className="recruiter-applications__list">
            {applicants.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onView={() => handleViewApplication(application)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Application details */}
      <ApplicationDetailsDialog
        open={Boolean(selectedApplication)}
        application={selectedApplication}
        onClose={handleCloseDialog}
        onStatusChange={handleStatusChange}
        isUpdatingStatus={isUpdatingStatus}
      />
    </section>
  );
};

export default RecruiterApplications;
