import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';

@Component({
  selector: 'app-add-pay-dialog',
  templateUrl: './add-pay-dialog.component.html',
  styleUrls: ['./add-pay-dialog.component.css']
})
export class AddPayDialogComponent {

  form!: FormGroup

  constructor(
    @Inject(MatDialogRef) private _dialogRef: MatDialogRef<AddPayDialogComponent>,
    @Inject(FormBuilder) private _fb: FormBuilder,
    @Inject(AuthService) private _authService: AuthService,
    @Inject(JobseekerService) private _jobseekerService: JobseekerService,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { salary: string }) {

    this.form = this._fb.group({
      minimumSalary: [data.salary ? data.salary : '$ ', Validators.required]
    })
  }

  onSubmit(): void {
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (this.form.valid && jobseekerId) {
      const minimumSalary = this.form.get('minimumSalary')?.value
      this._jobseekerService.addMinimumSalary(minimumSalary, jobseekerId).subscribe({
        next: (res) => {
          if (res.success === true) {
            this._snackBar.open('Minimum salary added', 'Close', {
              duration: 4000,
              verticalPosition: 'top'
            })
            this._dialogRef.close()
          }
        }
      })
    }
  }

  deleteSalary(): void {
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (jobseekerId) {
      this._jobseekerService.addMinimumSalary('', jobseekerId).subscribe({
        next: (res) => {
          if (res.success === true) {
            this._snackBar.open('Minimum salary deleted', 'Close', {
              duration: 4000,
              verticalPosition: 'top'
            })
            this._dialogRef.close()
          }
        }
      })
    }
  }



}
