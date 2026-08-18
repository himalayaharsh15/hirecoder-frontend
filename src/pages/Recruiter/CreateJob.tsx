import { useState } from "react";

import { ArrowBack, Business, WorkOutlined } from "@mui/icons-material";

import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import {
  useCreateJobMutation,
  type EmploymentType,
  type ExperienceLevel,
} from "../../features/jobs/jobsApi";

import "./CreateJob.scss";

const employmentOptions: {
  label: string;
  value: EmploymentType;
}[] = [
  {
    label: "Full Time",
    value: "FULL_TIME",
  },
  {
    label: "Part Time",
    value: "PART_TIME",
  },
  {
    label: "Contract",
    value: "CONTRACT",
  },
  {
    label: "Internship",
    value: "INTERN",
  },
  {
    label: "Freelance",
    value: "FREELANCE",
  },
];

const experienceOptions: {
  label: string;
  value: ExperienceLevel;
}[] = [
  {
    label: "Fresher",
    value: "FRESHER",
  },
  {
    label: "Junior",
    value: "JUNIOR",
  },
  {
    label: "Mid Level",
    value: "MID",
  },
  {
    label: "Senior",
    value: "SENIOR",
  },
  {
    label: "Lead",
    value: "LEAD",
  },
];

interface FormState {
  companyId: string;
  title: string;
  description: string;
  location: string;
  employmentType: EmploymentType | "";
  experienceLevel: ExperienceLevel | "";
  salaryMin: string;
  salaryMax: string;
  currency: string;
}

const initialForm: FormState = {
  companyId: "",
  title: "",
  description: "",
  location: "",
  employmentType: "",
  experienceLevel: "",
  salaryMin: "",
  salaryMax: "",
  currency: "INR",
};

const CreateJob = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(initialForm);

  const [error, setError] = useState("");

  const [createJob, { isLoading }] = useCreateJobMutation();

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const validate = () => {
    if (!form.companyId.trim()) {
      return "Company ID is required.";
    }

    if (!form.title.trim()) {
      return "Job title is required.";
    }

    if (!form.description.trim()) {
      return "Job description is required.";
    }

    if (!form.employmentType) {
      return "Please select employment type.";
    }

    if (!form.experienceLevel) {
      return "Please select experience level.";
    }

    if (form.salaryMin && Number.isNaN(Number(form.salaryMin))) {
      return "Minimum salary must be a valid number.";
    }

    if (form.salaryMax && Number.isNaN(Number(form.salaryMax))) {
      return "Maximum salary must be a valid number.";
    }

    if (
      form.salaryMin &&
      form.salaryMax &&
      Number(form.salaryMin) > Number(form.salaryMax)
    ) {
      return "Minimum salary cannot be greater than maximum salary.";
    }

    return "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await createJob({
        companyId: form.companyId.trim(),
        body: {
          title: form.title.trim(),
          description: form.description.trim(),
          location: form.location.trim() || undefined,
          employmentType: form.employmentType as EmploymentType,
          experienceLevel: form.experienceLevel as ExperienceLevel,
          salaryMin: form.salaryMin ? Number(form.salaryMin) : undefined,
          salaryMax: form.salaryMax ? Number(form.salaryMax) : undefined,
          currency: form.currency.trim() || "INR",
        },
      }).unwrap();

      navigate("/recruiter/jobs");
    } catch (requestError) {
      console.error("Failed to create job:", requestError);

      setError(
        "Unable to create the job. Please check your company ID and try again.",
      );
    }
  };

  return (
    <section className="create-job">
      <div className="create-job__container">
        {/* ================================================================ */}
        {/* BACK */}
        {/* ================================================================ */}

        <button
          type="button"
          className="create-job__back"
          onClick={() => navigate("/recruiter/jobs")}
        >
          <ArrowBack />
          Back to My Jobs
        </button>

        {/* ================================================================ */}
        {/* HEADER */}
        {/* ================================================================ */}

        <header className="create-job__header">
          <div className="create-job__header-icon">
            <WorkOutlined />
          </div>

          <div>
            <span>RECRUITER CENTER</span>

            <h1>Create a new job</h1>

            <p>
              Publish an opportunity and start receiving applications from
              qualified candidates.
            </p>
          </div>
        </header>

        {/* ================================================================ */}
        {/* FORM */}
        {/* ================================================================ */}

        <form className="create-job__form" onSubmit={handleSubmit}>
          {/* -------------------------------------------------------------- */}
          {/* BASIC INFORMATION */}
          {/* -------------------------------------------------------------- */}

          <section className="create-job__section">
            <div className="create-job__section-header">
              <div>
                <h2>Basic information</h2>

                <p>Tell candidates what this role is about.</p>
              </div>
            </div>

            <div className="create-job__fields">
              <TextField
                label="Job Title"
                placeholder="e.g. Senior React Developer"
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                required
                fullWidth
              />

              <TextField
                label="Location"
                placeholder="e.g. Bangalore, India"
                value={form.location}
                onChange={(event) =>
                  updateField("location", event.target.value)
                }
                fullWidth
              />

              <div className="create-job__full-width">
                <TextField
                  label="Job Description"
                  placeholder="Describe the role, responsibilities, requirements and what you're looking for..."
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  required
                  multiline
                  rows={10}
                  fullWidth
                  helperText={`${form.description.length} characters`}
                />
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------------- */}
          {/* JOB DETAILS */}
          {/* -------------------------------------------------------------- */}

          <section className="create-job__section">
            <div className="create-job__section-header">
              <div>
                <h2>Job details</h2>

                <p>Define the type of candidate you're looking for.</p>
              </div>
            </div>

            <div className="create-job__grid">
              <FormControl fullWidth required>
                <InputLabel>Employment Type</InputLabel>

                <Select
                  value={form.employmentType}
                  label="Employment Type"
                  onChange={(event) =>
                    updateField(
                      "employmentType",
                      event.target.value as EmploymentType,
                    )
                  }
                >
                  {employmentOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText>
                  How will this person be employed?
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Experience Level</InputLabel>

                <Select
                  value={form.experienceLevel}
                  label="Experience Level"
                  onChange={(event) =>
                    updateField(
                      "experienceLevel",
                      event.target.value as ExperienceLevel,
                    )
                  }
                >
                  {experienceOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText>Required experience level</FormHelperText>
              </FormControl>
            </div>
          </section>

          {/* -------------------------------------------------------------- */}
          {/* COMPENSATION */}
          {/* -------------------------------------------------------------- */}

          <section className="create-job__section">
            <div className="create-job__section-header">
              <div>
                <h2>Compensation</h2>

                <p>Adding a salary range helps attract more candidates.</p>
              </div>
            </div>

            <div className="create-job__grid">
              <TextField
                label="Minimum Salary"
                placeholder="e.g. 800000"
                type="number"
                value={form.salaryMin}
                onChange={(event) =>
                  updateField("salaryMin", event.target.value)
                }
                fullWidth
                slotProps={{
                  htmlInput: {
                    min: 0,
                  },
                }}
              />

              <TextField
                label="Maximum Salary"
                placeholder="e.g. 1500000"
                type="number"
                value={form.salaryMax}
                onChange={(event) =>
                  updateField("salaryMax", event.target.value)
                }
                fullWidth
                slotProps={{
                  htmlInput: {
                    min: 0,
                  },
                }}
              />

              <TextField
                label="Currency"
                value={form.currency}
                onChange={(event) =>
                  updateField("currency", event.target.value.toUpperCase())
                }
                fullWidth
              />
            </div>
          </section>

          {/* -------------------------------------------------------------- */}
          {/* COMPANY */}
          {/* -------------------------------------------------------------- */}

          <section className="create-job__section">
            <div className="create-job__section-header">
              <div>
                <h2>Company</h2>

                <p>Connect this job to your HireCoder company.</p>
              </div>
            </div>

            <div className="create-job__company">
              <div className="create-job__company-icon">
                <Business />
              </div>

              <TextField
                label="Company ID"
                placeholder="Paste your company ID"
                value={form.companyId}
                onChange={(event) =>
                  updateField("companyId", event.target.value)
                }
                fullWidth
                required
                helperText="We'll replace this with a company selector once your recruiter company API is connected."
              />
            </div>
          </section>

          {/* -------------------------------------------------------------- */}
          {/* ERROR */}
          {/* -------------------------------------------------------------- */}

          {error && <Alert severity="error">{error}</Alert>}

          {/* -------------------------------------------------------------- */}
          {/* ACTIONS */}
          {/* -------------------------------------------------------------- */}

          <div className="create-job__actions">
            <Button
              type="button"
              variant="text"
              onClick={() => navigate("/recruiter/jobs")}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={
                isLoading ? <CircularProgress size={18} /> : <WorkOutlined />
              }
            >
              {isLoading ? "Publishing..." : "Publish Job"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateJob;
