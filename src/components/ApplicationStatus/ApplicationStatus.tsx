import {
  Chip,
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import type { ApplicationStatus } from "../../features/application/application.types";

import "./ApplicationStatus.scss";

interface ApplicationStatusProps {
  status: ApplicationStatus;
  editable?: boolean;
  disabled?: boolean;
  onChange?: (status: ApplicationStatus) => void;
}

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  APPLIED: "Applied",
  UNDER_REVIEW: "Under Review",
  SHORTLISTED: "Shortlisted",
  INTERVIEW_SCHEDULED: "Interview Scheduled",
  OFFERED: "Offered",
  REJECTED: "Rejected",
  HIRED: "Hired",
  WITHDRAWN: "Withdrawn",
};

const ApplicationStatusSection = ({
  status,
  editable = false,
  disabled = false,
  onChange,
}: ApplicationStatusProps) => {
  const label = STATUS_LABELS[status] ?? status;

  if (!editable) {
    return (
      <Chip
        label={label}
        size="small"
        className={`application-status application-status--${status.toLowerCase()}`}
      />
    );
  }

  const handleChange = (event: SelectChangeEvent) => {
    onChange?.(event.target.value as ApplicationStatus);
  };

  return (
    <FormControl size="small" className="application-status__select">
      <Select value={status} onChange={handleChange} disabled={disabled}>
        {(Object.keys(STATUS_LABELS) as ApplicationStatus[]).map((value) => (
          <MenuItem key={value} value={value} disabled={value === "WITHDRAWN"}>
            {STATUS_LABELS[value]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { STATUS_LABELS };

export default ApplicationStatusSection;
