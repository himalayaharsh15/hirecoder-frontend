export function getATSScoreStatus(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very Good";
  if (score >= 70) return "Good";
  if (score >= 60) return "Average";

  return "Needs Improvement";
}

export function getColor(score: number) {
  if (score >= 80) return "#22c55e";

  if (score >= 60) return "#f59e0b";

  return "#ef4444";
}

export function getDescription(score: number) {
  if (score >= 90) return "Outstanding! Your resume is highly ATS-friendly.";
  if (score >= 80) return "Great job! Only a few improvements are recommended";
  if (score >= 70)
    return "Good foundation, but there are several opportunities to improve.";
  if (score >= 60)
    return "Your resume needs significant improvements to increase interview chances.";

  return "Needs Improvement";
}
