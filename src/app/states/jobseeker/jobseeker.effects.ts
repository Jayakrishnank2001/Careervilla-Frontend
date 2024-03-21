import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { JobseekerService } from "src/app/services/jobseeker.service";
import { fetchJobseekerData, saveJobseekerOnStore } from "./jobseeker.actions";
import { map, switchMap } from "rxjs";


@Injectable()
export class JobseekerEffects{
    constructor(private readonly actions$: Actions,
        private readonly jobseekerService: JobseekerService) { }
    
    fetchJobseekerData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fetchJobseekerData),
            switchMap((action: { jobseekerId: string }) => {
                return this.jobseekerService.getJobseekerDetails(action.jobseekerId).pipe(
                    map(jobseekerRes=>saveJobseekerOnStore({jobseekerDetails:jobseekerRes}))
                )
            })
        )
    })
}