export type UserRole = "CANDIDATE" | "RECRUITER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}
