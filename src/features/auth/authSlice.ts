import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { User } from "./type";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  // 🔥 NEW
  // Tells protected routes whether we have finished
  // checking/restoring the user's authentication.
  isAuthInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,

  // 🔥 NEW
  isAuthInitialized: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;

      // 🔥 NEW
      // Authentication has now been restored successfully.
      state.isAuthInitialized = true;
    },

    // 🔥 NEW
    // Called when AuthInitializer finishes checking
    // for a refresh token, even when no token exists.
    setAuthInitialized: (state, action: PayloadAction<boolean>) => {
      state.isAuthInitialized = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      // 🔄 UPDATED
      // Logout itself doesn't mean that the initial
      // authentication check is happening again.
      state.isAuthInitialized = true;
    },
  },
});

export const { setCredentials, setAuthInitialized, logout } = authSlice.actions;

export default authSlice.reducer;
