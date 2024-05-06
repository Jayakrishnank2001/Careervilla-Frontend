import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jobTitles } from 'src/app/models/jobseeker';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';

@Component({
  selector: 'app-job-titles-dialog',
  templateUrl: './job-titles-dialog.component.html',
  styleUrls: ['./job-titles-dialog.component.css']
})
export class JobTitlesDialogComponent implements OnInit {

  form!: FormGroup

  constructor(
    @Inject(FormBuilder) private _fb: FormBuilder,
    @Inject(MatDialogRef) public _dialogRef: MatDialogRef<JobTitlesDialogComponent>,
    @Inject(AuthService) private _authService: AuthService,
    @Inject(JobseekerService) private _jobseekerService: JobseekerService,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { jobTitles: [string] }) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      jobTitles: this._fb.array([])
    });

    if (this.data.jobTitles && this.data.jobTitles.length > 0) {
      this.data.jobTitles.forEach((jobTitle) => {
        this.addJobTitle(jobTitle);
      });
    } else {
      this.addJobTitle();
    }
  }

  createJobTitle(initialValue = ''): FormGroup {
    return this._fb.group({
      name: [initialValue, Validators.required]
    });
  }

  get jobTitles(): FormArray {
    return this.form.get('jobTitles') as FormArray;
  }

  addJobTitle(initialValue = ''): void {
    this.jobTitles.push(this.createJobTitle(initialValue));
  }

  onSubmit(): void {
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (this.form.valid && jobseekerId) {
      const jobTitles: jobTitles[] = this.jobTitles.value;
      const jobTitleNames = jobTitles.map(jobTitle => jobTitle.name)
      this._jobseekerService.addJobTitles(jobTitleNames, jobseekerId).subscribe({
        next: (res) => {
          if (res.success === true) {
            this._snackBar.open('Job Titles added', 'Close', {
              duration: 4000,
              verticalPosition: 'top'
            })
            this._dialogRef.close()
          }
        }
      })
    }
  }

  deleteJobTitles(): void {
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (jobseekerId) {
      this._jobseekerService.addJobTitles([], jobseekerId).subscribe({
        next: (res) => {
          if (res.success === true) {
            this._snackBar.open('Job Titles deleted', 'Close', {
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
