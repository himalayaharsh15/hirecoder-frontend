import { baseApi } from "../api/baseApi";

import type {
  ResumeReview,
  ResumeUploadResponse,
  JobMatchResponse,
  InterviewPrepResponse,
  InterviewEvaluationResponse,
  UserResume,
} from "./types";

export const aiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================================================
    // Upload Resume PDF
    // ============================================================

    uploadResume: builder.mutation<ResumeUploadResponse, File>({
      query: (file) => {
        const formData = new FormData();

        formData.append("file", file);

        return {
          url: "/ai/resume/upload",
          method: "POST",
          body: formData,
        };
      },
    }),

    // ============================================================
    // Review My Uploaded Resume
    // ============================================================

    reviewMyResume: builder.mutation<ResumeReview, void>({
      query: () => ({
        url: "/ai/resume/review",
        method: "POST",
      }),
    }),

    // ============================================================
    // Analyze My Resume Against a Job
    // ============================================================
    //
    // We only send the jobId.
    //
    // Backend:
    //
    // JWT
    //   ↓
    // Current User
    //   ↓
    // Resume from DB
    //   +
    // Job from DB
    //   ↓
    // Gemini
    //   ↓
    // JobMatch
    //
    // ============================================================

    analyzeMyJobMatch: builder.mutation<JobMatchResponse, string>({
      query: (jobId) => ({
        url: `/ai/job-match/${jobId}`,
        method: "POST",
      }),
    }),

    generateInterviewPrep: builder.mutation<InterviewPrepResponse, string>({
      query: (jobId) => ({
        url: `/ai/interview-prep/${jobId}`,
        method: "POST",
      }),
    }),

    // ============================================================
    // Get Available AI Models
    // ============================================================

    getModels: builder.query<any, void>({
      query: () => "/ai/models",
    }),

    evaluateInterviewAnswer: builder.mutation<
      InterviewEvaluationResponse,
      {
        jobId: string;
        question: string;
        answer: string;
      }
    >({
      query: ({ jobId, question, answer }) => ({
        url: `/ai/interview/evaluate/${jobId}`,
        method: "POST",
        body: {
          question,
          answer,
        },
      }),
    }),

    transcribeInterviewAudio: builder.mutation<
      { transcript: string },
      FormData
    >({
      query: (formData) => ({
        url: "/ai/interview/transcribe",
        method: "POST",
        body: formData,
      }),
    }),

    generateCoverLetter: builder.mutation<{ coverLetter: string }, string>({
      query: (jobId) => ({
        url: `/ai/cover-letter/${jobId}`,
        method: "POST",
      }),
    }),

    getMyResume: builder.query<{ resume: UserResume | null }, void>({
      query: () => ({
        url: "/ai/resume",
        method: "GET",
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useUploadResumeMutation,
  useReviewMyResumeMutation,
  useAnalyzeMyJobMatchMutation,
  useGetModelsQuery,
  useGenerateInterviewPrepMutation,
  useEvaluateInterviewAnswerMutation,
  useTranscribeInterviewAudioMutation,
  useGenerateCoverLetterMutation,
  useGetMyResumeQuery,
} = aiApi;
