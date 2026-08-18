export type ApplicationStatus =
  | "APPLIED"
  | "UNDER_REVIEW"
  | "SHORTLISTED"
  | "INTERVIEW_SCHEDULED"
  | "OFFERED"
  | "REJECTED"
  | "HIRED"
  | "WITHDRAWN";

export interface ApplicantProfile {
  headline?: string | null;
  experience?: number | null;
  skills?: string[] | null;
  resumeUrl?: string | null;
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  profile?: ApplicantProfile | null;
}

export interface JobApplicant {
  id: string;
  status: ApplicationStatus;
  coverLetter?: string | null;
  resumeUrl?: string | null;
  createdAt: string;
  updatedAt?: string;
  candidate: Applicant;
}

export interface ApplicantsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApplicantsResponse {
  message: string;
  applicants: JobApplicant[];
  pagination: ApplicantsPagination;
}

export interface GetJobApplicantsParams {
  jobId: string;
  page?: number;
  limit?: number;
}

export interface UpdateApplicationStatusRequest {
  applicationId: string;
  status: ApplicationStatus;
  jobId: string;
}

export interface UpdateApplicationStatusResponse {
  message: string;
  application: JobApplicant;
}

export interface RecruiterApplicationSummary {
  totalApplicants: number;
  shortlisted: number;
  interviews: number;
  hired: number;
  pipeline: {
    applied: number;
    underReview: number;
    shortlisted: number;
    interviewScheduled: number;
    offered: number;
    rejected: number;
    hired: number;
    withdrawn: number;
  };
}

export interface RecentApplication {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;

  candidate: Applicant;

  job: {
    id: string;
    title: string;
    company: {
      id: string;
      name: string;
      logoUrl?: string | null;
    };
  };
}

export interface RecentApplicationsResponse {
  applications: RecentApplication[];
}

export interface RecruiterDashboardPipeline {
  applied: number;
  underReview: number;
  shortlisted: number;
  interviewScheduled: number;
  offered: number;
  rejected: number;
  hired: number;
  withdrawn: number;
}

export interface RecruiterDashboardSummary {
  totalApplicants: number;
  shortlisted: number;
  interviews: number;
  hired: number;
  pipeline: RecruiterDashboardPipeline;
}

export interface MyApplicationJobCompany {
  id: string;
  name: string;
  logoUrl?: string | null;
}

export interface MyApplicationJob {
  id: string;
  title: string;
  location?: string | null;
  employmentType?: string | null;
  experienceLevel?: string | null;
  isActive?: boolean;
  company: MyApplicationJobCompany;
}

export interface MyApplication {
  id: string;
  status: ApplicationStatus;
  coverLetter?: string | null;
  resumeUrl?: string | null;
  createdAt: string;
  updatedAt?: string;
  job: MyApplicationJob;
}

export interface MyApplicationsResponse {
  message: string;
  applications: MyApplication[];
  pagination: ApplicantsPagination;
}
