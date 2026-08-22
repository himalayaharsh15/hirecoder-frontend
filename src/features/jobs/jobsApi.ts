import { baseApi } from "../api/baseApi";

export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERN"
  | "FREELANCE";

export type ExperienceLevel = "FRESHER" | "JUNIOR" | "MID" | "SENIOR" | "LEAD";

export type JobSource = "HIRECODER" | "GREENHOUSE" | "ADZUNA" | "ASHBY";

export interface JobCompany {
  id?: string;
  name: string;
  logoUrl?: string;
  location?: string;
  description?: string;
  website?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  companyName?: string;
  location?: string;
  category: JobCategory;

  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;

  salaryMin?: number;
  salaryMax?: number;
  currency: string;

  source: JobSource;
  sourceJobId?: string;

  sourceUrl?: string;
  applyUrl?: string;

  createdAt: string;

  company?: JobCompany;

  _count?: {
    applications: number;
  };
  isActive: boolean;
}

export interface JobPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JobsResponse {
  message: string;
  jobs: Job[];
  pagination: JobPagination;
}

export interface JobFilters {
  search?: string;
  location?: string;
  category?: JobCategory;
  employmentType?: EmploymentType;
  experienceLevel?: ExperienceLevel;
  sort?: "latest" | "oldest";
  page?: number;
  limit?: number;
}

export type JobCategory =
  | "TECHNOLOGY"
  | "DATA"
  | "SALES"
  | "MARKETING"
  | "FINANCE"
  | "DESIGN"
  | "HUMAN_RESOURCES"
  | "OPERATIONS"
  | "OTHER";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<JobsResponse, JobFilters | void>({
      query: (filters = {}) => ({
        url: "/jobs",
        method: "GET",
        ...(filters ? { params: filters } : {}),
      }),
      providesTags: ["Jobs"],
    }),

    getJob: builder.query<{ message: string; job: Job }, string>({
      query: (jobId) => ({
        url: `/jobs/${jobId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, jobId) => [{ type: "Jobs", id: jobId }],
    }),

    saveJob: builder.mutation<{ message: string; saved: boolean }, string>({
      query: (jobId) => ({
        url: `/jobs/${jobId}/save`,
        method: "POST",
      }),

      invalidatesTags: (_result, _error, jobId) => [
        { type: "Jobs", id: `SAVED-${jobId}` },
        "Jobs",
      ],
    }),

    unsaveJob: builder.mutation<{ message: string; saved: boolean }, string>({
      query: (jobId) => ({
        url: `/jobs/${jobId}/save`,
        method: "DELETE",
      }),

      invalidatesTags: (_result, _error, jobId) => [
        { type: "Jobs", id: `SAVED-${jobId}` },
        "Jobs",
      ],
    }),

    getSavedJobs: builder.query<JobsResponse, void>({
      query: () => ({
        url: "/jobs/saved",
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),

    getJobSavedStatus: builder.query<{ saved: boolean }, string>({
      query: (jobId) => ({
        url: `/jobs/${jobId}/saved`,
        method: "GET",
      }),
      providesTags: (_result, _error, jobId) => [
        { type: "Jobs", id: `SAVED-${jobId}` },
      ],
    }),

    applyToJob: builder.mutation<
      {
        message: string;
        application: {
          id: string;
          status: string;
          coverLetter?: string;
          resumeUrl?: string | null;
        };
      },
      {
        jobId: string;
        coverLetter?: string;
      }
    >({
      query: ({ jobId, coverLetter }) => ({
        url: `/jobs/${jobId}/apply`,
        method: "POST",
        body: {
          coverLetter,
        },
      }),

      invalidatesTags: (_result, _error, { jobId }) => [
        { type: "Jobs", id: `APPLICATION-${jobId}` },
        { type: "Jobs", id: jobId },
        "Jobs",
      ],
    }),

    getJobApplication: builder.query<
      {
        applied: boolean;
        application: {
          id: string;
          status: string;
          coverLetter?: string;
          resumeUrl?: string;
        } | null;
      },
      string
    >({
      query: (jobId) => ({
        url: `/jobs/${jobId}/application`,
        method: "GET",
      }),
      providesTags: (_result, _error, jobId) => [
        { type: "Jobs", id: `APPLICATION-${jobId}` },
      ],
    }),

    getMyJobs: builder.query<
      {
        message: string;
        jobs: Job[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
      },
      {
        page?: number;
        limit?: number;
      }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "jobs/my/jobs",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Jobs"],
    }),

    createJob: builder.mutation<
      {
        message: string;
        job: Job;
      },
      {
        companyId: string;
        body: {
          title: string;
          description: string;
          location?: string;
          employmentType: EmploymentType;
          experienceLevel: ExperienceLevel;
          salaryMin?: number;
          salaryMax?: number;
          currency?: string;
        };
      }
    >({
      query: ({ companyId, body }) => ({
        url: `/jobs/companies/${companyId}/jobs`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),

    deleteJob: builder.mutation<
      {
        message: string;
      },
      string
    >({
      query: (jobId) => ({
        url: `/my/jobs/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetJobsQuery,
  useGetJobQuery,
  useGetSavedJobsQuery,
  useSaveJobMutation,
  useUnsaveJobMutation,
  useGetJobSavedStatusQuery,
  useApplyToJobMutation,
  useGetJobApplicationQuery,
  useGetMyJobsQuery,
  useCreateJobMutation,
  useDeleteJobMutation,
} = jobsApi;
