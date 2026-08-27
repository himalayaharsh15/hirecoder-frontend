import { baseApi } from "../api/baseApi";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "./type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Login User
     * POST /auth/login
     */
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    /**
     * Register User
     * POST /auth/register
     */
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    /**
     * Refresh Access Token
     * POST /auth/refresh
     */
    refreshToken: builder.mutation<LoginResponse, { refreshToken: string }>({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body,
      }),
    }),

    /**
     * Logout User
     * POST /auth/logout
     */
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        responseHandler: "text",
      }),
    }),

    /**
     * ------------------------------------------------------------
     * Google Login
     * ------------------------------------------------------------
     *
     * Sends the Google ID token to the backend.
     *
     * The backend verifies the token with Google and then
     * returns the normal HireCoder access + refresh tokens.
     */
    googleLogin: builder.mutation<LoginResponse, { credential: string }>({
      query: (body) => ({
        url: "/auth/google",
        method: "POST",
        body,
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGoogleLoginMutation,
} = authApi;
