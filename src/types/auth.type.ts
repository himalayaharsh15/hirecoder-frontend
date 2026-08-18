export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "CANDIDATE" | "RECRUITER";
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;

  user: {
    id: string;
    name: string;
    email: string;
    role: "CANDIDATE" | "RECRUITER";
  };
}
