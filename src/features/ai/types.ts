// ============================================================
// AI Resume Review
// ============================================================

export interface ResumeReview {
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  interviewChance: string;
  summary: string;
}

// ============================================================
// Old Resume Review Request
// ============================================================
//
// This was used when the user pasted resume text directly.
// We don't need this for the new PDF-based flow.
//
// Keep it temporarily if another component still uses it.
// We can remove it later.
// ============================================================

export interface ReviewResumeRequest {
  resume: string;
}

// ============================================================
// Resume Upload Response
// ============================================================

export interface ResumeUploadResponse {
  message: string;

  resume: {
    id: string;
    fileName: string;
  };
}

export interface JobMatch {
  matchScore: number;

  matchedSkills: string[];

  missingSkills: string[];

  experienceMatch: boolean;

  interviewTopics: string[];

  recommendations: string[];

  summary: string;
}

export interface JobMatchResponse {
  job: {
    id: string;
    title: string;
  };

  resume: {
    id: string;
    fileName: string;
  };

  analysis: JobMatch;
}

export interface InterviewQuestion {
  question: string;
  category: string;
  difficulty: string;
  whyAsked: string;
}

export interface InterviewPrep {
  questions: InterviewQuestion[];
}

export interface InterviewPrepResponse {
  job: {
    id: string;
    title: string;
  };

  resume: {
    id: string;
    fileName: string;
  };

  interviewPrep: InterviewPrep;
}

export interface InterviewEvaluation {
  score: number;
  strengths: string[];
  improvements: string[];
  idealAnswer: string;
  followUpQuestion: string;
}

export interface InterviewEvaluationResponse {
  job: {
    id: string;
    title: string;
  };

  question: string;

  evaluation: InterviewEvaluation;
}
