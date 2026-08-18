import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";

import { LocationOn, Search } from "@mui/icons-material";

import {
  useGetJobsQuery,
  useSaveJobMutation,
  useGetSavedJobsQuery,
  useUnsaveJobMutation,
  type EmploymentType,
  type ExperienceLevel,
  type JobFilters,
} from "../../features/jobs/jobsApi";

import "./Jobs.scss";
import JobCard from "./JobCard";

const PAGE_SIZE = 10;

const employmentOptions: {
  label: string;
  value: EmploymentType;
}[] = [
  { label: "Full Time", value: "FULL_TIME" },
  { label: "Part Time", value: "PART_TIME" },
  { label: "Contract", value: "CONTRACT" },
  { label: "Internship", value: "INTERN" },
  { label: "Freelance", value: "FREELANCE" },
];

const experienceOptions: {
  label: string;
  value: ExperienceLevel;
}[] = [
  { label: "Fresher", value: "FRESHER" },
  { label: "Junior", value: "JUNIOR" },
  { label: "Mid Level", value: "MID" },
  { label: "Senior", value: "SENIOR" },
  { label: "Lead", value: "LEAD" },
];

const Jobs = () => {
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const [filters, setFilters] = useState<JobFilters>({
    page: 1,
    limit: PAGE_SIZE,
    sort: "latest",
  });

  /*
   * --------------------------------------------------------------------------
   * Jobs
   * --------------------------------------------------------------------------
   */

  const queryFilters = useMemo(
    () => ({
      ...filters,
      page: filters.page || 1,
      limit: PAGE_SIZE,
    }),
    [filters],
  );

  const { data, isLoading, isFetching, isError, refetch } =
    useGetJobsQuery(queryFilters);

  /*
   * --------------------------------------------------------------------------
   * Saved Jobs
   * --------------------------------------------------------------------------
   */

  const { data: savedJobsData, isLoading: isSavedJobsLoading } =
    useGetSavedJobsQuery();

  const [saveJob, { isLoading: isSaving }] = useSaveJobMutation();

  const [unsaveJob, { isLoading: isUnsaving }] = useUnsaveJobMutation();

  /*
   * Create a Set containing saved job IDs.
   *
   * This makes checking whether a job is saved very fast:
   *
   * savedJobIds.has(job.id)
   */

  const savedJobIds = useMemo(() => {
    return new Set(savedJobsData?.jobs?.map((job) => job.id) ?? []);
  }, [savedJobsData]);

  /*
   * --------------------------------------------------------------------------
   * Search
   * --------------------------------------------------------------------------
   */

  const handleSearch = () => {
    setFilters((previous) => ({
      ...previous,
      search: searchInput.trim() || undefined,
      location: locationInput.trim() || undefined,
      page: 1,
    }));
  };

  /*
   * --------------------------------------------------------------------------
   * Reset filters
   * --------------------------------------------------------------------------
   */

  const handleReset = () => {
    setSearchInput("");
    setLocationInput("");

    setFilters({
      page: 1,
      limit: PAGE_SIZE,
      sort: "latest",
    });
  };

  /*
   * --------------------------------------------------------------------------
   * Pagination
   * --------------------------------------------------------------------------
   */

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setFilters((previous) => ({
      ...previous,
      page,
    }));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * --------------------------------------------------------------------------
   * Save / Unsave
   * --------------------------------------------------------------------------
   */

  const handleSave = async (jobId: string, currentlySaved: boolean) => {
    try {
      if (currentlySaved) {
        await unsaveJob(jobId).unwrap();
      } else {
        await saveJob(jobId).unwrap();
      }
    } catch (error) {
      console.error("Failed to update saved job:", error);
    }
  };

  /*
   * --------------------------------------------------------------------------
   * Render
   * --------------------------------------------------------------------------
   */

  return (
    <section className="jobs-page">
      {/* ------------------------------------------------------------------ */}
      {/* HERO */}
      {/* ------------------------------------------------------------------ */}

      <div className="jobs-page__hero">
        <div className="jobs-page__hero-content">
          <span className="jobs-page__eyebrow">HIRECODER JOBS</span>

          <h1>
            Find your
            <span> next opportunity.</span>
          </h1>

          <p>
            Discover opportunities from leading companies and trusted job
            platforms, all in one place.
          </p>

          <div className="jobs-page__search">
            <TextField
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Job title, skill or company"
              className="jobs-page__search-field"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              value={locationInput}
              onChange={(event) => setLocationInput(event.target.value)}
              placeholder="Location"
              className="jobs-page__search-field"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              className="jobs-page__search-button"
              onClick={handleSearch}
            >
              Search Jobs
            </Button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CONTENT */}
      {/* ------------------------------------------------------------------ */}

      <div className="jobs-page__container">
        {/* ---------------------------------------------------------------- */}
        {/* FILTERS */}
        {/* ---------------------------------------------------------------- */}

        <aside className="jobs-page__filters">
          <div className="jobs-page__filter-header">
            <div>
              <span>FILTERS</span>
              <h3>Refine your search</h3>
            </div>

            <Button size="small" onClick={handleReset}>
              Clear
            </Button>
          </div>

          {/* Employment Type */}

          <FormControl fullWidth>
            <InputLabel>Employment Type</InputLabel>

            <Select
              value={filters.employmentType || ""}
              label="Employment Type"
              onChange={(event) => {
                setFilters((previous) => ({
                  ...previous,
                  employmentType: (event.target.value || undefined) as
                    | EmploymentType
                    | undefined,
                  page: 1,
                }));
              }}
            >
              <MenuItem value="">All types</MenuItem>

              {employmentOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Experience */}

          <FormControl fullWidth>
            <InputLabel>Experience</InputLabel>

            <Select
              value={filters.experienceLevel || ""}
              label="Experience"
              onChange={(event) => {
                setFilters((previous) => ({
                  ...previous,
                  experienceLevel: (event.target.value || undefined) as
                    | ExperienceLevel
                    | undefined,
                  page: 1,
                }));
              }}
            >
              <MenuItem value="">All levels</MenuItem>

              {experienceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sort */}

          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>

            <Select
              value={filters.sort || "latest"}
              label="Sort By"
              onChange={(event) => {
                setFilters((previous) => ({
                  ...previous,
                  sort: event.target.value as "latest" | "oldest",
                  page: 1,
                }));
              }}
            >
              <MenuItem value="latest">Newest first</MenuItem>

              <MenuItem value="oldest">Oldest first</MenuItem>
            </Select>
          </FormControl>
        </aside>

        {/* ---------------------------------------------------------------- */}
        {/* RESULTS */}
        {/* ---------------------------------------------------------------- */}

        <main className="jobs-page__results">
          <div className="jobs-page__results-header">
            <div>
              <h2>Latest opportunities</h2>

              {!isLoading && data?.pagination && (
                <p>{data.pagination.total} jobs found</p>
              )}
            </div>

            {isFetching && !isLoading && <CircularProgress size={22} />}
          </div>

          {/* Error */}

          {isError && (
            <Alert
              severity="error"
              className="jobs-page__error"
              action={
                <Button color="inherit" size="small" onClick={refetch}>
                  Retry
                </Button>
              }
            >
              Unable to load jobs. Please try again.
            </Alert>
          )}

          {/* Loading */}

          {isLoading && (
            <div className="jobs-page__loading">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="jobs-page__skeleton" key={index}>
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              ))}
            </div>
          )}

          {/* Empty */}

          {!isLoading && !isError && (data?.jobs?.length ?? 0) === 0 && (
            <div className="jobs-page__empty">
              <div className="jobs-page__empty-icon">
                <Search />
              </div>

              <h3>No jobs found</h3>

              <p>We couldn't find jobs matching your current filters.</p>

              <Button variant="outlined" onClick={handleReset}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Jobs */}

          {!isLoading && !isError && (data?.jobs?.length ?? 0) > 0 && (
            <>
              <div className="jobs-page__grid">
                {data?.jobs.map((job) => {
                  const isSaved = savedJobIds.has(job.id);

                  return (
                    <JobCard
                      key={job.id}
                      job={job}
                      saved={isSaved}
                      onSave={() => handleSave(job.id, isSaved)}
                      isSaving={isSaving || isUnsaving || isSavedJobsLoading}
                    />
                  );
                })}
              </div>

              {/* Pagination */}

              {(data?.pagination?.totalPages ?? 0) > 1 && (
                <Box className="jobs-page__pagination">
                  <Pagination
                    count={data?.pagination?.totalPages ?? 1}
                    page={data?.pagination?.page ?? 1}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </>
          )}
        </main>
      </div>
    </section>
  );
};

export default Jobs;
