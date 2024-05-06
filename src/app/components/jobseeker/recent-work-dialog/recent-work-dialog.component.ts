import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';

@Component({
  selector: 'app-recent-work-dialog',
  templateUrl: './recent-work-dialog.component.html',
  styleUrls: ['./recent-work-dialog.component.css']
})
export class RecentWorkDialogComponent {

  form!: FormGroup

  constructor(
    @Inject(MatDialogRef) private _dialogRef: MatDialogRef<RecentWorkDialogComponent>,
    @Inject(FormBuilder) private _fb: FormBuilder,
    @Inject(AuthService) private _authService: AuthService,
    @Inject(JobseekerService) private _jobseekerService: JobseekerService,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { work: string }) {

    this.form = this._fb.group({
      recentWork: [data.work ? data.work : '', Validators.required]
    })
  }

  onSubmit(): void {
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (this.form.valid && jobseekerId) {
      const recentWork = this.form.get('recentWork')?.value
      this._jobseekerService.addRecentWork(recentWork, jobseekerId).subscribe({
        next: (res) => {
          if (res.success === true) {
            this._snackBar.open('Recent work experience added', 'Close', {
              duration: 4000,
              verticalPosition: 'top'
            })
            this._dialogRef.close()
          }
        }
      })
    }
  }

  deleteExperience(): void{
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (jobseekerId)
      this._jobseekerService.addRecentWork('',jobseekerId).subscribe({
        next: (res) => {
          if (res.success === true) {
            this._snackBar.open('Recent work experience deleted', 'Close', {
              duration: 4000,
              verticalPosition:'top'
            })
            this._dialogRef.close()
          }
        }
      })
  }




}
