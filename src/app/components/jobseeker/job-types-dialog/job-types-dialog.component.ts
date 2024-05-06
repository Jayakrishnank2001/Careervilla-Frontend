import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';

@Component({
  selector: 'app-job-types-dialog',
  templateUrl: './job-types-dialog.component.html',
  styleUrls: ['./job-types-dialog.component.css']
})
export class JobTypesDialogComponent {

  form!: FormGroup
  
  constructor(
    @Inject(MatDialogRef) private _dialogRef: MatDialogRef<JobTypesDialogComponent>,
    @Inject(FormBuilder) private _fb: FormBuilder,
    @Inject(AuthService) private _authService: AuthService,
    @Inject(JobseekerService) private _jobseekerService: JobseekerService,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { jobTypes: [string] }) {

    this.form = this._fb.group({
      jobTypes: [data.jobTypes ? data.jobTypes : [], Validators.required]
    })
  }


  onSubmit(): void{
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (this.form.valid && jobseekerId) {
      const selectedJobTypes = this.form.get('jobTypes')?.value;
      this._jobseekerService.addJobTypes(selectedJobTypes, jobseekerId).subscribe({
        next: (res) => {
          if (res.success === true) {
            this._snackBar.open('Job Types added', 'Close', {
              duration: 4000,
              verticalPosition:'top'
            })
            this._dialogRef.close()
          }
        }
      })
    }
  }

}
