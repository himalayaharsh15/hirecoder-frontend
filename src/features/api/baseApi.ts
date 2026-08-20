import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from "../../App/store";

/**
 * Base API configuration for RTK Query.
 *
 * All feature APIs such as auth, jobs, profile,
 * applications, and saved jobs use this base API.
 */
export const baseApi = createApi({
  /**
   * Key used to store RTK Query state inside Redux.
   */
  reducerPath: "api",

  /**
   * Common configuration for all API requests.
   */
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    /**
     * Add the access token to protected API requests.
     *
     * RTK Query calls this before every request.
     */
    prepareHeaders: (headers, { getState }) => {
      /**
       * Get the access token from the Redux auth state.
       */
      const token = (getState() as RootState).auth.accessToken;

      /**
       * Attach the token as a Bearer token
       * when the user is authenticated.
       */
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  /**
   * Cache tags used by different feature APIs.
   *
   * These will be used later for cache invalidation
   * and automatic refetching.
   */
  tagTypes: [
    "Profile",
    "Company",
    "Job",
    "Application",
    "SavedJob",
    "Dashboard",
    "Jobs",
    "Resume",
    "CandidateDashboard",
  ],

  /**
   * The base API doesn't define endpoints itself.
   *
   * Feature-specific endpoints are added using
   * baseApi.injectEndpoints().
   */
  endpoints: () => ({}),
});
