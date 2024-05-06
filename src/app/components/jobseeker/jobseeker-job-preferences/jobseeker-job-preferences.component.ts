import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IJobseekerRes } from 'src/app/models/jobseeker';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { AddPayDialogComponent } from '../add-pay-dialog/add-pay-dialog.component';
import { JobTypesDialogComponent } from '../job-types-dialog/job-types-dialog.component';
import { JobTitlesDialogComponent } from '../job-titles-dialog/job-titles-dialog.component';

@Component({
  selector: 'app-jobseeker-job-preferences',
  templateUrl: './jobseeker-job-preferences.component.html',
  styleUrls: ['./jobseeker-job-preferences.component.css']
})
export class JobseekerJobPreferencesComponent implements OnInit {

  jobseeker: IJobseekerRes = {}

  constructor(
    @Inject(MatDialog) private _dialog: MatDialog,
    @Inject(AuthService) private _authService: AuthService,
    @Inject(JobseekerService) private _jobseekerService: JobseekerService) { }

  ngOnInit(): void {
    this.getJobseekerDetails()
  }

  getJobseekerDetails(): void {
    const jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (jobseekerId)
      this._jobseekerService.getJobseekerDetails(jobseekerId).subscribe({
        next: (res) => {
          this.jobseeker = res
        }
      })
  }

  addMinimumSalary(): void {
    const dialogRef = this._dialog.open(AddPayDialogComponent, {
      data: { salary: this.jobseeker.jobPreferences?.minimumSalary }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getJobseekerDetails()
    })
  }

  addJobTypes(): void {
    const dialogRef = this._dialog.open(JobTypesDialogComponent, {
      data: { jobTypes: this.jobseeker.jobPreferences?.jobTypes }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getJobseekerDetails()
    })
  }

  addJobTitles(): void {
    const dialogRef = this._dialog.open(JobTitlesDialogComponent, {
      data: { jobTitles: this.jobseeker.jobPreferences?.jobTitles }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getJobseekerDetails()
    })
  }




}
