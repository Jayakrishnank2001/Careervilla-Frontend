import { createReducer, on } from "@ngrx/store";
import { type IJobseekerRes } from "src/app/models/jobseeker";
import { deleteJobseekerFromStore, saveJobseekerOnStore } from "./jobseeker.actions";

export interface JobseekerState {
    jobseekerDetails: IJobseekerRes | null
}

export const initialJobseekerState: JobseekerState = {
    jobseekerDetails: null
}

export const jobSeekerReducer = createReducer(
    initialJobseekerState,
    on(saveJobseekerOnStore, (state, { jobseekerDetails }) => {
        return {...state, jobseekerDetails}
    }),
    on(deleteJobseekerFromStore, (state) => {
        return { ...state, jobseekerDetails:null }
    })
)