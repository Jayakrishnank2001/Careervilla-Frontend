import { createAction, props } from "@ngrx/store";
import { type IJobseekerRes } from "src/app/models/jobseeker";

export const fetchJobseekerData = createAction('[Jobseeker] Fetch User Data From Database', props<{ jobseekerId: string }>())
export const saveJobseekerOnStore = createAction('[Jobseeker] Save User Data On Store', props<{ jobseekerDetails: IJobseekerRes }>())
export const deleteJobseekerFromStore = createAction('[Jobseeker] Delete User Data From Store')
 