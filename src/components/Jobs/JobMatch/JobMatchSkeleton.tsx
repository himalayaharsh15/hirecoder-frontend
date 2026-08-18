import { Card, Skeleton } from "@mui/material";

import "./JobMatchSkeleton.scss";

const JobMatchSkeleton = () => {
  return (
    <section className="job-match-skeleton">
      <div className="job-match-skeleton__header">
        <Skeleton variant="text" width={130} height={20} />

        <Skeleton variant="text" width={250} height={40} />

        <Skeleton variant="text" width={320} height={25} />
      </div>

      <Card className="job-match-skeleton__score">
        <div className="job-match-skeleton__score-content">
          <Skeleton variant="circular" width={150} height={150} />

          <div>
            <Skeleton variant="text" width={140} height={25} />

            <Skeleton variant="text" width={180} height={40} />

            <Skeleton variant="text" width={400} height={30} />

            <Skeleton variant="text" width={350} height={30} />
          </div>
        </div>
      </Card>

      <div className="job-match-skeleton__grid">
        {[1, 2].map((item) => (
          <Card key={item}>
            <Skeleton variant="text" width={180} height={30} />

            <Skeleton height={35} />
            <Skeleton height={35} />
            <Skeleton height={35} />
          </Card>
        ))}
      </div>

      <Card>
        <Skeleton variant="text" width={200} height={30} />

        <Skeleton height={40} />
        <Skeleton height={40} />
      </Card>

      <Card>
        <Skeleton variant="text" width={220} height={30} />

        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </Card>
    </section>
  );
};

export default JobMatchSkeleton;
