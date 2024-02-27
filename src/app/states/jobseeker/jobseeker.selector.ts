import { createFeatureSelector, createSelector } from "@ngrx/store";
import { type JobseekerState } from "./jobseeker.reducer";

export const selectJobseekerState = createFeatureSelector<JobseekerState>('jobseeker')
export const selectJobseekerDetails = createSelector(
    selectJobseekerState,
    (state: JobseekerState) => state.jobseekerDetails
)
