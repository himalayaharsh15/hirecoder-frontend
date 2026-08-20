import { baseApi } from "../api/baseApi";

export interface CandidateDashboardStats {
  applications: number;
  interviews: number;
  shortlisted: number;
  savedJobs: number;
}

export interface CandidateDashboardApplication {
  id: string;
  status: string;
  createdAt: string;

  job: {
    id: string;
    title: string;
    companyName: string | null;
  };
}

export interface CandidateDashboardJob {
  id: string;
  title: string;
  companyName: string | null;
  location: string | null;
  employmentType: string;
  experienceLevel: string;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string;
}

export interface CandidateDashboardResponse {
  stats: CandidateDashboardStats;
  profileCompletion: number;
  recentApplications: CandidateDashboardApplication[];
  recommendedJobs: CandidateDashboardJob[];
}

export const candidateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateDashboard: builder.query<CandidateDashboardResponse, void>({
      query: () => ({
        url: "/candidate/dashboard",
        method: "GET",
      }),

      providesTags: ["CandidateDashboard"],
    }),
  }),

  overrideExisting: false,
});

export const { useGetCandidateDashboardQuery } = candidateApi;
