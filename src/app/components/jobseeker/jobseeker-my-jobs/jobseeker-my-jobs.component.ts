import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IJobRes } from 'src/app/models/job';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { ApplyJobDialogComponent } from '../apply-job-dialog/apply-job-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jobseeker-my-jobs',
  templateUrl: './jobseeker-my-jobs.component.html',
  styleUrls: ['./jobseeker-my-jobs.component.css']
})
export class JobseekerMyJobsComponent implements OnInit {

  savedJobs: IJobRes[] = []
  appliedJobs: IJobRes[] = []
  jobseekerId!: string | null
  selectedJobs: IJobRes[] = []
  isSavedJobs!: boolean
  savedJobsIdArray: (string | undefined)[] = []
  appliedJobsIdArray: (string | undefined)[] = []

  constructor(private jobseekerService: JobseekerService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.jobseekerId = this.authService.extractUserIdFromToken('jobseekerToken')
    this.getSavedJobs(this.jobseekerId)
    this.getAppliedJobs(this.jobseekerId)
    this.getJobseekerDetails()
  }

  getJobseekerDetails(): void {
    if (this.jobseekerId) {
      this.jobseekerService.getJobseekerDetails(this.jobseekerId).subscribe({
        next: (res) => {
          this.appliedJobsIdArray = res.appliedJobs?.map(job => job.jobId) || [];
          this.savedJobsIdArray = res.savedJobs?.map(job => job.jobId) || [];
        }
      })
    }
  }


  getSavedJobs(jobseekerId: string | null): void {
    if (jobseekerId) {
      this.jobseekerService.getSavedJobs(jobseekerId).subscribe({
        next: (res) => {
          this.savedJobs = res
          this.isSavedJobs = true
        }
      })
    }
  }

  getAppliedJobs(jobseekerId: string | null): void {
    if (jobseekerId) {
      this.jobseekerService.getAppliedJobs(jobseekerId).subscribe({
        next: (res) => {
          this.appliedJobs = res
          this.isSavedJobs = false
        }
      })
    }
  }

  onApplyJob(jobId: string | undefined): void {
    this.getJobseekerDetails()
    if (this.appliedJobsIdArray.includes(jobId)) {
      this.snackBar.open('Already applied to this job', 'Close', {
        duration: 5000,
        verticalPosition: 'top'
      })
    } else {
      const dialogRef = this.dialog.open(ApplyJobDialogComponent, {
        data: { jobId, jobseekerId: this.jobseekerId }
      })
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit()
      })
    }
  }

  onUnsaveJob(jobId: string | undefined): void {
    if (this.jobseekerId && jobId) {
      this.jobseekerService.unsaveJob(this.jobseekerId, jobId).subscribe({
        next: (res) => {
          if (res.data.success == true) {
            this.snackBar.open('Job unsaved successfully', 'Close', {
              duration: 5000,
              verticalPosition: 'top'
            })
            this.getSavedJobs(this.jobseekerId)
          }
        }
      })
    }
  }

  onWithdrawApplication(jobId: string | undefined): void{
    void Swal.fire({
      title:'Are you sure ?',
      text: 'Do you want to withdraw the application ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed && jobId && this.jobseekerId) {
        this.jobseekerService.withdrawApplication(jobId, this.jobseekerId).subscribe({
          next: (res) => {
            if (res.data.success == true) {
              this.getAppliedJobs(this.jobseekerId)
              this.snackBar.open('Job application withdrawn','Close', {
                duration: 5000,
                verticalPosition:'top'
              })
            }
          }
        })
      }
    })
  }








}
