import { createAction, props } from "@ngrx/store";
import { IEmployerRes } from "src/app/models/employer";

export const fetchEmployerData = createAction('[Employer] Fetch User Data From Database', props<{ employerId: string }>())
export const saveEmployerOnStore = createAction('[Employer] Save User Data On Store', props<{ employerDetails: IEmployerRes }>())
export const deleteEmployerFromStore = createAction('[Employer] Delete User Data From Store')
