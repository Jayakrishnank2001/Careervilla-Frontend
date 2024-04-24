import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IJobRes } from 'src/app/models/job';
import { AuthService } from 'src/app/services/auth.service';
import { JobService } from 'src/app/services/job.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { ApplyJobDialogComponent } from '../apply-job-dialog/apply-job-dialog.component';
import { ReportJobComponent } from '../../common/report-job/report-job.component';
import { ReportedJobService } from 'src/app/services/reported-job.service';

@Component({
  selector: 'app-jobseeker-job-details',
  templateUrl: './jobseeker-job-details.component.html',
  styleUrls: ['./jobseeker-job-details.component.css']
})
export class JobseekerJobDetailsComponent implements OnInit {

  jobId!: string
  job: IJobRes = {}
  savedJobs: (string | undefined)[] = []
  appliedJobs: (string | undefined)[] = []
  jobseekerId!: string | null

  constructor(private _route: ActivatedRoute,
    private _jobService: JobService,
    private _authService: AuthService,
    private _jobseekerService: JobseekerService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _reportedJobService: ReportedJobService) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.jobId = params['jobId'];
      this.getJobDetails()
    });
    this.getAppliedJobs()
  }

  getJobDetails(): void {
    this._jobService.getJobDetails(this.jobId).subscribe({
      next: (res) => {
        this.job = res
        console.log(this.job)
      }
    })
  }

  getAppliedJobs(): void {
    this.jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    if (this.jobseekerId) {
      this._jobseekerService.getJobseekerDetails(this.jobseekerId).subscribe({
        next: (res) => {
          this.savedJobs = res?.savedJobs?.map(job => job.jobId) || [];
          this.appliedJobs = res?.appliedJobs?.map(job => job.jobId) || []
        }
      })
    }
  }

  applyJob(jobId: string | undefined): void {
    if (this.jobseekerId) {
      this._jobseekerService.getJobseekerDetails(this.jobseekerId).subscribe({
        next: (res) => {
          this.appliedJobs = res?.appliedJobs?.map(job => job.jobId) || [];
          if (this.appliedJobs.includes(jobId)) {
            this._snackBar.open('Already applied to this job', 'Close', {
              duration: 5000,
              verticalPosition: 'top'
            })
          } else {
            this._dialog.open(ApplyJobDialogComponent, {
              data: { jobId, jobseekerId: this.jobseekerId }
            })
          }
        }
      })
    }
  }

  reportJob(jobTitle: string | undefined, companyName: string | undefined): void {
    if (jobTitle && companyName)
      this.openDialog(jobTitle, companyName)
  }

  openDialog(jobTitle: string, companyName: string): void {
    const dialogRef = this._dialog.open(ReportJobComponent, {
      data: { jobTitle, companyName }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.jobseekerId) {
        this._reportedJobService.reportJob(this.job.companyId?._id, this.job._id, this.jobseekerId, result.reason, result.description).subscribe({
          next: (res) => {
            if (res.success === true) {
              this._snackBar.open('Job reported successfully', 'Close', {
                duration: 5000,
                verticalPosition: 'top'
              })
            }
          }
        })
      }
    })
  }

  saveJob(jobId: string | undefined): void {
    if (this.jobseekerId && jobId)
      this._jobseekerService.saveJob(this.jobseekerId, jobId).subscribe({
        next: (res) => {
          if (res.data.success === true) {
            this._snackBar.open('Job saved successfully', 'Close', {
              duration: 5000,
              verticalPosition: 'top'
            })
            this.getAppliedJobs()
          }
        }
      })
  }

  unsaveJob(jobId: string | undefined): void {
    if (this.jobseekerId && jobId) {
      this._jobseekerService.unsaveJob(this.jobseekerId, jobId).subscribe({
        next: (res) => {
          if (res.data.success === true) {
            this._snackBar.open('Job unsaved successfully', 'Close', {
              duration: 5000,
              verticalPosition: 'top'
            })
            this.getAppliedJobs()
          }
        }
      })
    }
  }








}
