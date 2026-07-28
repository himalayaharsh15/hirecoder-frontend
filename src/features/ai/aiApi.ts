import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { ResumeReview, ReviewResumeRequest } from "./types";

export const aiApi = createApi({
  reducerPath: "aiApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),

  endpoints: (builder) => ({
    reviewResume: builder.mutation<ResumeReview, ReviewResumeRequest>({
      query: (body) => ({
        url: "/ai/resume-review",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useReviewResumeMutation } = aiApi;
