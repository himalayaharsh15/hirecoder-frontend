import { useRef, useState } from "react";
import ResumeInput from "../../components/resume/ResumeInput";
import { useReviewResumeMutation } from "../../features/ai/aiApi";

import "./ResumeAnalyzer.scss";
import type { ResumeReview as ResumeReviewType } from "../../features/ai/types";
import ResumeReview from "../../components/resume/ResumeReview/ResumeReview";
import ResumeReviewSkeleton from "../../components/resume/ResumeReviewSkeleton/ResumeReviewSkeleton";

const ResumeAnalyzer = () => {
  const [reviewResume, { data, isLoading, error }] = useReviewResumeMutation();
  const [review, setReview] = useState<ResumeReviewType | null>(null);
  const reviewSectionRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async (resume: string) => {
    setReview(null);
    try {
      const response = await reviewResume({ resume }).unwrap();

      setReview(response);

      reviewSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="resume-analyzer">
      <ResumeInput onAnalyze={handleAnalyze} isLoading={isLoading} />
      <div ref={reviewSectionRef}>
        {isLoading && <ResumeReviewSkeleton />}
        {review && !isLoading && <ResumeReview review={review} />}
      </div>
    </section>
  );
};

export default ResumeAnalyzer;
