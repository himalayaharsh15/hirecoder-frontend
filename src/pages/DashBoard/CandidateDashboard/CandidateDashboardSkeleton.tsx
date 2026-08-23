import { Skeleton } from "@mui/material";
import "./CandidateDashboardSkeleton.scss";

const CandidateDashboardSkeleton = () => {
  return (
    <section className="candidate-dashboard">
      <div className="candidate-dashboard__container">
        {/* Welcome section */}
        <section className="candidate-dashboard__welcome">
          <div className="candidate-dashboard__welcome-content">
            <Skeleton variant="text" width="35%" height={24} />

            <Skeleton variant="text" width="70%" height={52} />

            <Skeleton variant="text" width="90%" height={28} />
            <Skeleton variant="text" width="75%" height={28} />

            <div className="candidate-dashboard__skeleton-actions">
              <Skeleton variant="rounded" width={130} height={42} />

              <Skeleton variant="rounded" width={130} height={42} />
            </div>
          </div>

          {/* Keep the same space as the real visual */}
          <div className="candidate-dashboard__welcome-visual">
            <Skeleton variant="circular" width={104} height={104} />
          </div>
        </section>

        {/* Stats */}
        <section className="candidate-dashboard__stats">
          {[1, 2, 3, 4].map((item) => (
            <div className="candidate-dashboard__stat-skeleton" key={item}>
              <Skeleton variant="rounded" width={44} height={44} />

              <div>
                <Skeleton width={80} />
                <Skeleton width={45} height={28} />
              </div>
            </div>
          ))}
        </section>

        {/* Main content */}
        <section className="candidate-dashboard__grid">
          <div className="candidate-dashboard__card">
            <Skeleton width="35%" height={20} />
            <Skeleton width="50%" height={30} />

            {[1, 2, 3].map((item) => (
              <div
                className="candidate-dashboard__application-skeleton"
                key={item}
              >
                <Skeleton variant="rounded" width={42} height={42} />

                <div>
                  <Skeleton width={180} />
                  <Skeleton width={120} />
                </div>

                <Skeleton width={70} />
              </div>
            ))}
          </div>

          {/* Profile */}
          <div className="candidate-dashboard__card">
            <Skeleton width="35%" height={20} />
            <Skeleton width="60%" height={30} />

            <Skeleton variant="rounded" width="100%" height={8} />

            <Skeleton width="90%" />
            <Skeleton width="70%" />

            <Skeleton variant="rounded" width={140} height={40} />
          </div>
        </section>

        {/* Recommended jobs */}
        <section className="candidate-dashboard__jobs">
          <Skeleton width="25%" height={20} />
          <Skeleton width="40%" height={30} />

          {[1, 2, 3].map((item) => (
            <div className="candidate-dashboard__job-skeleton" key={item}>
              <div>
                <Skeleton width={220} />
                <Skeleton width={130} />
              </div>

              <Skeleton variant="rounded" width={90} height={38} />
            </div>
          ))}
        </section>

        {/* Quick actions */}
        <section className="candidate-dashboard__quick-actions">
          <Skeleton width={150} height={30} />

          <div className="candidate-dashboard__quick-grid">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} variant="rounded" height={70} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default CandidateDashboardSkeleton;
