import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployerService } from "src/app/services/employer.service";
import { fetchEmployerData, saveEmployerOnStore } from "./employer.actions";
import { map, switchMap } from "rxjs";


@Injectable()
export class EmployerEffects{
    constructor(private readonly actions$: Actions,
        private readonly employerService: EmployerService) { }
    
    fetchEmployerData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fetchEmployerData),
            switchMap((action: { employerId: string }) => {
                return this.employerService.getEmployerDetails(action.employerId).pipe(
                    map(employerRes=>saveEmployerOnStore({employerDetails:employerRes}))
                )
            })
        )
    })
}