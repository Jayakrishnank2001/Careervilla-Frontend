import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { IJobRes } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { ReportJobComponent } from '../../common/report-job/report-job.component';
import { ReportedJobService } from 'src/app/services/reported-job.service';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { ApplyJobDialogComponent } from '../apply-job-dialog/apply-job-dialog.component';

@Component({
  selector: 'app-jobseeker-jobs',
  templateUrl: './jobseeker-jobs.component.html',
  styleUrls: ['./jobseeker-jobs.component.css']
})
export class JobseekerJobsComponent {

  jobs: IJobRes[] = []
  selectJob: IJobRes = {}
  savedJobs: (string | undefined)[] = []
  appliedJobs: (string | undefined)[] = []
  jobseekerId!: string | null


  constructor(private breakpointObserver: BreakpointObserver,
    private jobService: JobService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private reportedJobService: ReportedJobService,
    private authService: AuthService,
    private jobseekerService: JobseekerService) { }

  ngOnInit(): void {
    this.jobseekerId = this.authService.extractUserIdFromToken('jobseekerToken')
    this.getJobs()
    this.getSavedJobs()
  }

  isSmallScreen = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches)
    );

  getJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (res) => {
        this.jobs = res
        this.selectJob = this.jobs[0]
      }
    })
  }

  getSavedJobs(): void {
    if (this.jobseekerId) {
      this.jobseekerService.getJobseekerDetails(this.jobseekerId).subscribe({
        next: (res) => {
          this.savedJobs = res?.savedJobs?.map(job => job.jobId) || [];
          this.appliedJobs = res?.appliedJobs?.map(job => job.jobId) || []
        }
      })
    }
  }

  isJobSaved(jobId: string | undefined): boolean {
    return this.savedJobs.includes(jobId);
  }

  selectedJob(job: IJobRes): void {
    this.selectJob = job
  }

  onReportJob(jobTitle: string | undefined, companyName: string | undefined): void {
    if (jobTitle && companyName)
      this.openDialog(jobTitle, companyName)
  }

  openDialog(jobTitle: string, companyName: string): void {
    const dialogRef = this.dialog.open(ReportJobComponent, {
      data: { jobTitle, companyName }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.jobseekerId) {
        this.reportedJobService.reportJob(this.selectJob.companyId?._id, this.selectJob._id, this.jobseekerId, result.reason, result.description).subscribe({
          next: (res) => {
            if (res.success == true) {
              this.snackBar.open('Job reported successfully', 'Close', {
                duration: 5000,
                verticalPosition: 'top'
              })
            }
          }
        })
      }
    })
  }

  onSaveJob(jobId: string | undefined): void {
    if (this.jobseekerId && jobId)
      this.jobseekerService.saveJob(this.jobseekerId, jobId).subscribe({
        next: (res) => {
          if (res.data.success == true) {
            this.snackBar.open('Job saved successfully', 'Close', {
              duration: 5000,
              verticalPosition: 'top'
            })
            this.getSavedJobs()
          }
        }
      })
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
            this.getSavedJobs()
          }
        }
      })
    }
  }

  onApplyJob(jobId: string | undefined): void {
    if (this.jobseekerId) {
      this.jobseekerService.getJobseekerDetails(this.jobseekerId).subscribe({
        next: (res) => {
          this.appliedJobs = res?.appliedJobs?.map(job => job.jobId) || [];
          if (this.appliedJobs.includes(jobId)) {
            this.snackBar.open('Already applied to this job', 'Close', {
              duration: 5000,
              verticalPosition: 'top'
            })
          } else {
            this.dialog.open(ApplyJobDialogComponent, {
              data: { jobId, jobseekerId: this.jobseekerId }
            })
          }
        }
      })
    }

  }





}
