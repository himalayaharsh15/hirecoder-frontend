import {
  CheckCircleOutlined,
  GroupsOutlined,
  ScheduleOutlined,
  StarBorderOutlined,
  WorkOutlined,
} from "@mui/icons-material";

import "./RecruiterDashboard.scss";

interface PipelineData {
  applied: number;
  underReview: number;
  shortlisted: number;
  interviewScheduled: number;
  offered: number;
  rejected: number;
  hired: number;
  withdrawn: number;
}

interface RecruiterPipelineProps {
  pipeline: PipelineData;
}

const RecruiterPipeline = ({ pipeline }: RecruiterPipelineProps) => {
  const items = [
    {
      label: "Applied",
      value: pipeline.applied,
      icon: <GroupsOutlined />,
    },
    {
      label: "Under Review",
      value: pipeline.underReview,
      icon: <ScheduleOutlined />,
    },
    {
      label: "Shortlisted",
      value: pipeline.shortlisted,
      icon: <StarBorderOutlined />,
    },
    {
      label: "Interviews",
      value: pipeline.interviewScheduled,
      icon: <WorkOutlined />,
    },
    {
      label: "Hired",
      value: pipeline.hired,
      icon: <CheckCircleOutlined />,
    },
  ];

  return (
    <section className="recruiter-dashboard__pipeline">
      <div className="recruiter-dashboard__pipeline-header">
        <div>
          <h2>Application Pipeline</h2>

          <p>Track candidates through your hiring process</p>
        </div>
      </div>

      <div className="recruiter-dashboard__pipeline-items">
        {items.map((item) => (
          <div key={item.label} className="recruiter-dashboard__pipeline-item">
            <div className="recruiter-dashboard__pipeline-icon">
              {item.icon}
            </div>

            <div>
              <span>{item.label}</span>

              <strong>{item.value}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecruiterPipeline;
