import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployerState } from "./employer.reducer";


export const selectEmployerState = createFeatureSelector<EmployerState>('employer')
export const selectEmployerDetails = createSelector(
    selectEmployerState,
    (state:EmployerState)=>state.employerDetails
)