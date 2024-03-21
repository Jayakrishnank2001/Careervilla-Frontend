import { createReducer, on } from "@ngrx/store";
import { IEmployerRes } from "src/app/models/employer";
import { deleteEmployerFromStore, saveEmployerOnStore } from "./employer.actions";

export interface EmployerState{
    employerDetails: IEmployerRes | null
}

export const initialEmployerState: EmployerState = {
    employerDetails: null
}

export const employerReducer = createReducer(
    initialEmployerState,
    on(saveEmployerOnStore, (state, { employerDetails }) => {
        return {...state,employerDetails}
    }),
    on(deleteEmployerFromStore, (state) => {
        return {...state,employerDetails:null}
    })
)
