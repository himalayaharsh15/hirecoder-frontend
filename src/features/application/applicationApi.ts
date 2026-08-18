import { baseApi } from "../api/baseApi";

import type {
  ApplicantsPagination,
  ApplicantsResponse,
  GetJobApplicantsParams,
  MyApplication,
  MyApplicationsResponse,
  RecentApplicationsResponse,
  RecruiterApplicationSummary,
  RecruiterDashboardSummary,
  UpdateApplicationStatusRequest,
  UpdateApplicationStatusResponse,
} from "./application.types";

export const applicationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobApplicants: builder.query<ApplicantsResponse, GetJobApplicantsParams>(
      {
        query: ({ jobId, page = 1, limit = 10 }) => ({
          url: `/applications/jobs/${jobId}/applicants`,
          method: "GET",
          params: {
            page,
            limit,
          },
        }),

        providesTags: (_result, _error, { jobId }) => [
          {
            type: "Application",
            id: jobId,
          },
        ],
      },
    ),

    updateApplicationStatus: builder.mutation<
      UpdateApplicationStatusResponse,
      UpdateApplicationStatusRequest
    >({
      query: ({ applicationId, status }) => ({
        url: `/applications/${applicationId}/status`,
        method: "PATCH",
        body: {
          status,
        },
      }),

      invalidatesTags: (_result, _error, { jobId }) => [
        {
          type: "Application",
          id: jobId,
        },
      ],
    }),

    getRecruiterApplicationSummary: builder.query<
      RecruiterApplicationSummary,
      void
    >({
      query: () => ({
        url: "/applications/recruiter/summary",
        method: "GET",
      }),
      providesTags: ["Application"],
    }),

    getRecentRecruiterApplications: builder.query<
      RecentApplicationsResponse,
      void
    >({
      query: () => ({
        url: "/applications/recruiter/recent",
        method: "GET",
      }),
    }),

    // ============================================================
    // 🔥 NEW: Recruiter Dashboard Summary
    //
    // GET /applications/recruiter/summary
    //
    // Returns:
    // - Total applicants
    // - Shortlisted candidates
    // - Interviews
    // - Hired candidates
    // - Complete application pipeline
    // ============================================================

    getRecruiterDashboardStats: builder.query<RecruiterDashboardSummary, void>({
      query: () => ({
        url: "/applications/recruiter/summary",
        method: "GET",
      }),

      // 🔥 NEW:
      // Allows dashboard data to be refreshed automatically
      // when Application data changes.
      providesTags: ["Dashboard"],
    }),

    /**
     * Get applications submitted by the authenticated candidate
     *
     * GET /applications/my/applications
     */
    getMyApplications: builder.query<
      MyApplicationsResponse,
      {
        page?: number;
        limit?: number;
      }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/applications/my/applications",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),

      providesTags: ["Application"],
    }),

    /**
     * Withdraw a job application
     *
     * PATCH /applications/my/applications/:applicationId/withdraw
     *
     * Used by candidates to withdraw their own application.
     */
    withdrawApplication: builder.mutation<
      { message: string; application: MyApplication },
      { applicationId: string }
    >({
      query: ({ applicationId }) => ({
        url: `/applications/my/applications/${applicationId}/withdraw`,
        method: "PATCH",
      }),

      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useGetJobApplicantsQuery,
  useUpdateApplicationStatusMutation,
  useGetRecruiterApplicationSummaryQuery,
  useGetRecentRecruiterApplicationsQuery,
  useGetRecruiterDashboardStatsQuery,
  useGetMyApplicationsQuery,
  useWithdrawApplicationMutation,
} = applicationsApi;
