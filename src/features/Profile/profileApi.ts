import { baseApi } from "../api/baseApi";

export interface Profile {
  id: string;
  userId: string;
  headline?: string;
  bio?: string;
  location?: string;
  experience?: number;
  skills?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export interface CreateProfileRequest {
  headline?: string;
  bio?: string;
  location?: string;
  experience?: number;
  skills?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get the currently logged-in user's profile.
     *
     * GET /profile/me
     */
    getMyProfile: builder.query<Profile, void>({
      query: () => ({
        url: "/profile/me",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    /**
     * Get a user's public profile.
     *
     * GET /profile/:userId
     */
    getProfile: builder.query<Profile, string>({
      query: (userId) => ({
        url: `/profile/${userId}`,
        method: "GET",
      }),
    }),

    /**
     * Create or update the logged-in user's profile.
     *
     * POST /profile
     */
    createOrUpdateProfile: builder.mutation<Profile, CreateProfileRequest>({
      query: (profileData) => ({
        url: "/profile",
        method: "POST",
        body: profileData,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetMyProfileQuery,
  useGetProfileQuery,
  useCreateOrUpdateProfileMutation,
} = profileApi;
