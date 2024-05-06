import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';

@Component({
  selector: 'app-highest-education-dialog',
  templateUrl: './highest-education-dialog.component.html',
  styleUrls: ['./highest-education-dialog.component.css']
})
export class HighestEducationDialogComponent {

  form!: FormGroup

  constructor(
    @Inject(MatDialogRef) private _dialogRef: MatDialogRef<HighestEducationDialogComponent>,
    @Inject(FormBuilder) private _fb: FormBuilder,
    @Inject(AuthService) private _authService: AuthService,
    @Inject(JobseekerService) private _jobseekerService: JobseekerService,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { education: string }) {

    this.form = this._fb.group({
      highestEducation: [data.education ? data.education : '', Validators.required]
    })
  }

  onSubmit(): void {
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (this.form.valid && jobseekerId) {
      const highestEducation = this.form.get('highestEducation')?.value
      this._jobseekerService.addHighestEducation(highestEducation, jobseekerId).subscribe({
        next: (res) => {
          if (res.success === true) {
            this._snackBar.open('Highest education added', 'Close', {
              duration: 4000,
              verticalPosition: 'top'
            })
            this._dialogRef.close()
          }
        }
      })
    }
  }

  deleteEducation(): void {
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (jobseekerId)
      this._jobseekerService.addHighestEducation('', jobseekerId).subscribe({
        next: (res) => {
          if (res.success === true) {
            this._snackBar.open('Highest education deleted', 'Close', {
              duration: 4000,
              verticalPosition: 'top'
            })
            this._dialogRef.close()
          }
        }
      })
  }

}
