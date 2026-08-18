import { useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import { ArrowBack, DescriptionOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import "./MyApplications.scss";

import MyApplicationCard from "../../components/MyApplicationCard/MyApplicationCard";
import CandidateApplicationDetailsDialog from "../../components/CandidateApplicationDetailsDialog/CandidateApplicationDetailsDialog";

import {
  useGetMyApplicationsQuery,
  useWithdrawApplicationMutation,
} from "../../features/application/applicationApi";

import type { MyApplication } from "../../features/application/application.types";

const MyApplications = () => {
  const navigate = useNavigate();

  // ============================================================
  // SELECTED APPLICATION
  // ============================================================
  // Stores the application currently being viewed in the
  // CandidateApplicationDetailsDialog.

  const [selectedApplication, setSelectedApplication] =
    useState<MyApplication | null>(null);

  // ============================================================
  // GET MY APPLICATIONS
  // ============================================================

  const { data, isLoading, isError, refetch } = useGetMyApplicationsQuery({
    page: 1,
    limit: 10,
  });

  const applications = data?.applications ?? [];

  // ============================================================
  // WITHDRAW APPLICATION
  // ============================================================

  const [withdrawApplication, { isLoading: isWithdrawing }] =
    useWithdrawApplicationMutation();

  // ============================================================
  // VIEW APPLICATION
  // ============================================================

  const handleViewApplication = (application: MyApplication) => {
    setSelectedApplication(application);
  };

  // ============================================================
  // CLOSE APPLICATION DETAILS
  // ============================================================

  const handleCloseDialog = () => {
    setSelectedApplication(null);
  };

  // ============================================================
  // WITHDRAW APPLICATION
  // ============================================================

  const handleWithdraw = async () => {
    if (!selectedApplication) {
      return;
    }

    try {
      await withdrawApplication({
        applicationId: selectedApplication.id,
      }).unwrap();

      // Close the details dialog after successful withdrawal.
      setSelectedApplication(null);

      // Refresh the application list so the new
      // WITHDRAWN status is displayed.
      refetch();
    } catch (error) {
      console.error("Failed to withdraw application:", error);
    }
  };

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (isLoading) {
    return (
      <section className="my-applications my-applications--loading">
        <CircularProgress />
      </section>
    );
  }

  // ============================================================
  // ERROR STATE
  // ============================================================

  if (isError) {
    return (
      <section className="my-applications">
        <div className="my-applications__container">
          <Alert severity="error">Unable to load your applications.</Alert>

          <button
            type="button"
            className="my-applications__retry"
            onClick={() => refetch()}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <section className="my-applications">
      <div className="my-applications__container">
        {/* ======================================================
            BACK TO JOBS
        ====================================================== */}

        <button
          type="button"
          className="my-applications__back"
          onClick={() => navigate("/jobs")}
        >
          <ArrowBack />

          <span>Back to Jobs</span>
        </button>

        {/* ======================================================
            PAGE HEADER
        ====================================================== */}

        <header className="my-applications__header">
          <div>
            <span className="my-applications__eyebrow">CANDIDATE CENTER</span>

            <h1>My Applications</h1>

            <p>
              Track the jobs you've applied to and follow your application
              progress.
            </p>
          </div>

          {/* Application count */}

          <div className="my-applications__count">
            <strong>{data?.pagination.total ?? 0}</strong>

            <span>
              {data?.pagination.total === 1 ? "Application" : "Applications"}
            </span>
          </div>
        </header>

        {/* ======================================================
            APPLICATION LIST / EMPTY STATE
        ====================================================== */}

        {applications.length === 0 ? (
          <div className="my-applications__empty">
            <div className="my-applications__empty-icon">
              <DescriptionOutlined />
            </div>

            <h2>No applications yet</h2>

            <p>
              You haven't applied to any jobs yet. Start exploring jobs and
              submit your first application.
            </p>

            <button
              type="button"
              className="my-applications__browse-button"
              onClick={() => navigate("/jobs")}
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="my-applications__list">
            {applications.map((application) => (
              <MyApplicationCard
                key={application.id}
                application={application}
                onView={() => handleViewApplication(application)}
              />
            ))}
          </div>
        )}

        {/* ======================================================
            APPLICATION DETAILS DIALOG
        ====================================================== */}

        <CandidateApplicationDetailsDialog
          open={Boolean(selectedApplication)}
          application={selectedApplication}
          onClose={handleCloseDialog}
          onWithdraw={handleWithdraw}
          isWithdrawing={isWithdrawing}
        />
      </div>
    </section>
  );
};

export default MyApplications;
