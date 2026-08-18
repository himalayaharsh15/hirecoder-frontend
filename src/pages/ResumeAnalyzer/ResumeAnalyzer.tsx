import { useState } from "react";

import {
  useReviewMyResumeMutation,
  useUploadResumeMutation,
} from "../../features/ai/aiApi";

import type { ResumeReview as ResumeReviewType } from "../../features/ai/types";

import ResumeInput from "../../components/resume/ResumeInput";
import ResumeReview from "../../components/resume/ResumeReview/ResumeReview";
import ResumeReviewSkeleton from "../../components/resume/ResumeReviewSkeleton/ResumeReviewSkeleton";

import "./ResumeAnalyzer.scss";

const ResumeAnalyzer = () => {
  const [review, setReview] = useState<ResumeReviewType | null>(null);

  // ============================================================
  // Upload Resume
  // ============================================================

  const [uploadResume, { isLoading: isUploading }] = useUploadResumeMutation();

  // ============================================================
  // Analyze Resume
  // ============================================================

  const [reviewMyResume, { isLoading: isReviewing }] =
    useReviewMyResumeMutation();

  // ============================================================
  // Handle PDF Upload
  // ============================================================

  const handleUpload = async (file: File) => {
    await uploadResume(file).unwrap();

    // Previous analysis belongs to the previous resume.
    setReview(null);
  };

  // ============================================================
  // Handle AI Analysis
  // ============================================================

  const handleAnalyze = async () => {
    try {
      const result = await reviewMyResume().unwrap();

      setReview(result);
    } catch (error) {
      console.error("Resume analysis failed:", error);
    }
  };

  return (
    <section className="resume-analyzer">
      <div className="resume-analyzer__container">
        {/* ======================================================
            Header
        ====================================================== */}

        <header className="resume-analyzer__header">
          <span className="resume-analyzer__eyebrow">AI CAREER ASSISTANT</span>

          <h1>Resume Analyzer</h1>

          <p>
            Understand how strong your resume is and discover what you can
            improve before applying for jobs.
          </p>
        </header>

        {/* ======================================================
            Resume Upload
        ====================================================== */}

        <ResumeInput
          onUpload={handleUpload}
          onAnalyze={handleAnalyze}
          isUploading={isUploading}
          isAnalyzing={isReviewing}
        />

        {/* ======================================================
            AI Analysis Loading
        ====================================================== */}

        {isReviewing && <ResumeReviewSkeleton />}

        {/* ======================================================
            AI Analysis Result
        ====================================================== */}

        {review && !isReviewing && <ResumeReview review={review} />}
      </div>
    </section>
  );
};

export default ResumeAnalyzer;
