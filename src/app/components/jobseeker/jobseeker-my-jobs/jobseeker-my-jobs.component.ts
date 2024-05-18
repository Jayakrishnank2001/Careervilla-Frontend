import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IJobRes } from 'src/app/models/job';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { ApplyJobDialogComponent } from '../apply-job-dialog/apply-job-dialog.component';
import Swal from 'sweetalert2';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { IJobApplication } from 'src/app/models/jobApplication';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobseeker-my-jobs',
  templateUrl: './jobseeker-my-jobs.component.html',
  styleUrls: ['./jobseeker-my-jobs.component.css']
})
export class JobseekerMyJobsComponent implements OnInit {

  savedJobs: IJobRes[] = []
  appliedApplications: IJobApplication[] = []
  jobseekerId!: string | null
  selectedJobs: IJobRes[] = []
  isSavedJobs!: boolean
  savedJobsIdArray: (string | undefined)[] = []
  appliedJobsIdArray: (string | undefined)[] = []

  constructor(private _jobseekerService: JobseekerService,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _jobApplicationService: JobApplicationService,
    private _router: Router,
    private _jobService: JobService) { }

  ngOnInit(): void {
    this.jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    this.getSavedJobs(this.jobseekerId)
    this.getAppliedJobs(this.jobseekerId)
    this.getJobseekerDetails()
  }

  getJobseekerDetails(): void {
    if (this.jobseekerId) {
      this._jobseekerService.getJobseekerDetails(this.jobseekerId).subscribe({
        next: (res) => {
          this.appliedJobsIdArray = res.appliedJobs?.map(job => job.jobId) || [];
          this.savedJobsIdArray = res.savedJobs?.map(job => job.jobId) || [];
        }
      })
    }
  }


  getSavedJobs(jobseekerId: string | null): void {
    if (jobseekerId) {
      this._jobseekerService.getSavedJobs(jobseekerId).subscribe({
        next: (res) => {
          this.savedJobs = res
          this.savedJobs.reverse()
          this.isSavedJobs = true
        }
      })
    }
  }

  getAppliedJobs(jobseekerId: string | null): void {
    if (jobseekerId) {
      this._jobApplicationService.getJobseekerApplications(jobseekerId).subscribe({
        next: (res) => {
          this.appliedApplications = res
          this.appliedApplications.reverse()
          this.isSavedJobs = false
        }
      })
    }
  }

  onApplyJob(jobId: string | undefined): void {
    if (jobId)
      this._jobService.getJobDetails(jobId).subscribe({
        next: (res) => {
          if (res.status === 'Active' && res.isBlocked === false) {
            const dialogRef = this._dialog.open(ApplyJobDialogComponent, {
              data: { jobId, jobseekerId: this.jobseekerId }
            })
            dialogRef.afterClosed().subscribe(result => {
              this.getSavedJobs(this.jobseekerId)
              this.getAppliedJobs(this.jobseekerId)
              this.isSavedJobs = false
            })
          } else {
            this._snackBar.open('Job not found', 'Close', {
              duration: 3000,
              verticalPosition: 'top'
            })
          }
        }
      })
  }

  onUnsaveJob(jobId: string | undefined): void {
    if (this.jobseekerId && jobId) {
      this._jobseekerService.unsaveJob(this.jobseekerId, jobId).subscribe({
        next: (res) => {
          if (res.data.success === true) {
            this._snackBar.open('Job unsaved successfully', 'Close', {
              duration: 5000,
              verticalPosition: 'top'
            })
            this.getSavedJobs(this.jobseekerId)
          }
        }
      })
    }
  }

  onWithdrawApplication(jobId: string | undefined): void {
    void Swal.fire({
      title: 'Are you sure ?',
      text: 'Do you want to withdraw the application ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed && jobId && this.jobseekerId) {
        this._jobseekerService.withdrawApplication(jobId, this.jobseekerId).subscribe({
          next: (res) => {
            if (res.data.success === true) {
              this.getAppliedJobs(this.jobseekerId)
              this._snackBar.open('Job application withdrawn', 'Close', {
                duration: 5000,
                verticalPosition: 'top'
              })
            }
          }
        })
      }
    })
  }

  getJobDetails(jobId: string | undefined): void {
    this._router.navigate(['/jobseeker/job-details'], { queryParams: { jobId: jobId } })
  }

  messageEmployer(jobId: string | undefined) {
    if (jobId)
      this._jobService.getJobDetails(jobId).subscribe({
        next: (res) => {
          const queryParams = { image: res.postedBy?.image, employerId: res.postedBy?._id, firstName: res.postedBy?.firstName, lastName: res.postedBy?.lastName, companyName: res.companyId?.companyName }
          this._router.navigate(['/jobseeker/messages'], { queryParams })
        }
      })
  }








}
