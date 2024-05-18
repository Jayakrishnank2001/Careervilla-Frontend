import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IEmployerRes } from 'src/app/models/employer';
import { AuthService } from 'src/app/services/auth.service';
import { EmployerService } from 'src/app/services/employer.service';

@Component({
  selector: 'app-plan-dialog',
  templateUrl: './plan-dialog.component.html',
  styleUrls: ['./plan-dialog.component.css']
})
export class PlanDialogComponent implements OnInit {

  employerDetails: IEmployerRes = {}

  constructor(private _authService: AuthService,
    private _employerService: EmployerService,
    private _dialogRef: MatDialogRef<PlanDialogComponent>) { }

  ngOnInit(): void {
    this.getEmployerDetails()
  }

  getEmployerDetails(): void {
    const employerId = this._authService.extractUserIdFromToken('employerToken')
    if (employerId)
      this._employerService.getEmployerDetails(employerId).subscribe({
        next: (res) => {
          this.employerDetails = res
        }
      })
  }

  closeDialog(): void {
    this._dialogRef.close()
  }

}
