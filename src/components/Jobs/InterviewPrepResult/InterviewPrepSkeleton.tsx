import { Card, Skeleton } from "@mui/material";

import "./InterviewPrepSkeleton.scss";

const InterviewPrepSkeleton = () => {
  return (
    <section className="interview-prep-skeleton">
      <div className="interview-prep-skeleton__header">
        <Skeleton variant="text" width={150} height={20} />

        <Skeleton variant="text" width={280} height={40} />

        <Skeleton variant="text" width={380} height={25} />
      </div>

      <div className="interview-prep-skeleton__questions">
        {[1, 2, 3, 4].map((item) => (
          <Card
            key={item}
            className="interview-prep-skeleton__card"
            elevation={0}
          >
            <div className="interview-prep-skeleton__top">
              <Skeleton variant="rounded" width={40} height={40} />

              <div>
                <Skeleton variant="rounded" width={90} height={24} />
              </div>
            </div>

            <Skeleton variant="text" height={30} />

            <Skeleton variant="text" width="90%" height={30} />

            <div className="interview-prep-skeleton__why">
              <Skeleton variant="rounded" width={35} height={35} />

              <div>
                <Skeleton variant="text" width={130} height={25} />

                <Skeleton variant="text" width="100%" height={25} />

                <Skeleton variant="text" width="80%" height={25} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default InterviewPrepSkeleton;
