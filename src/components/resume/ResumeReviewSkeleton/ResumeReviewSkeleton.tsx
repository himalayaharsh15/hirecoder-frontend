import { Card, Skeleton } from "@mui/material";

import "./ResumeReviewSkeleton.scss";

const ResumeReviewSkeleton = () => {
  return (
    <section className="resume-review-skeleton">
      <Card className="resume-review-skeleton__score">
        <Skeleton variant="text" width={120} height={35} />

        <Skeleton variant="circular" width={150} height={150} />

        <Skeleton variant="text" width={180} height={30} />
      </Card>

      <div className="resume-review-skeleton__grid">
        {[1, 2].map((item) => (
          <Card key={item}>
            <Skeleton variant="text" width={180} height={30} />

            <Skeleton height={30} />

            <Skeleton height={30} />

            <Skeleton height={30} />
          </Card>
        ))}
      </div>

      <Card>
        <Skeleton variant="text" width={220} height={30} />

        <Skeleton height={30} />

        <Skeleton height={30} />

        <Skeleton height={30} />
      </Card>

      <Card>
        <Skeleton variant="text" width={180} height={30} />

        <Skeleton variant="rounded" height={120} />
      </Card>
    </section>
  );
};

export default ResumeReviewSkeleton;
