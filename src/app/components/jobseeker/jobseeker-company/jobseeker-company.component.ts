import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICompany } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { IReview } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { JobService } from 'src/app/services/job.service';
import { IJobRes } from 'src/app/models/job';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplyJobDialogComponent } from '../apply-job-dialog/apply-job-dialog.component';
import { ReportJobComponent } from '../../common/report-job/report-job.component';
import { ReportedJobService } from 'src/app/services/reported-job.service';

@Component({
  selector: 'app-jobseeker-company',
  templateUrl: './jobseeker-company.component.html',
  styleUrls: ['./jobseeker-company.component.css']
})
export class JobseekerCompanyComponent implements OnInit {

  companyId!: string
  company!: ICompany
  selected!: string
  jobseekerId!: string | null
  reviews: IReview[] = []
  jobs: IJobRes[] = []
  savedJobs: (string | undefined)[] = []
  appliedJobs: (string | undefined)[] = []
  page: number = 1;
  pageSize: number = 3;
  hasMoreJobs: boolean = true;
  searchQuery: string = ''
  viewPage:boolean=false

  constructor(private _route: ActivatedRoute,
    private _companyService: CompanyService,
    private _dialog: MatDialog,
    private _authService: AuthService,
    private _reviewService: ReviewService,
    private _jobService: JobService,
    private _jobseekerService: JobseekerService,
    private _snackBar: MatSnackBar,
    private _reportedJobService: ReportedJobService,
    private _router: Router) { }

  ngOnInit(): void {
    this.jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    this._route.queryParams.subscribe(params => {
      this.companyId = params['companyId'];
      this.getCompanyDetails()
    });
    this.getSavedJobs()
  }

  getCompanyDetails(): void {
    this._companyService.getCompanyDetails(this.companyId).subscribe({
      next: (res) => {
        this.company = res
        this.selected = 'overview'
        this.viewPage=true
      }
    })
  }

  getCompanyReviews(): void {
    this._reviewService.getAllReviews(undefined, this.companyId).subscribe({
      next: (res) => {
        this.reviews = res
        this.selected = 'review'
      }
    })
  }

  getCompanyJobs(): void {
    this._jobService.getJobs(this.page, this.pageSize, this.companyId).subscribe({
      next: (res) => {
        this.jobs = res
        this.jobs.reverse()
        this.selected = 'jobs'
      }
    })
  }

  onAddReview(): void {
    this.openReviewDialog()
  }

  openReviewDialog(): void {
    const dialogRef = this._dialog.open(ReviewDialogComponent, {
      data: { companyId: this.companyId, jobseekerId: this.jobseekerId }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getCompanyReviews()
    })
  }

  getSavedJobs(): void {
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

  saveJob(jobId: string | undefined): void {
    if (this.jobseekerId && jobId)
      this._jobseekerService.saveJob(this.jobseekerId, jobId).subscribe({
        next: (res) => {
          if (res.data.success === true) {
            this._snackBar.open('Job saved successfully', 'Close', {
              duration: 5000,
              verticalPosition: 'top'
            })
            this.getSavedJobs()
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
            this.getSavedJobs()
          }
        }
      })
    }
  }

  reportJob(jobTitle: string | undefined, companyName: string | undefined, jobId: string | undefined): void {
    if (jobTitle && companyName && jobId)
      this.openDialog(jobTitle, companyName, jobId)
  }

  openDialog(jobTitle: string, companyName: string, jobId: string): void {
    const dialogRef = this._dialog.open(ReportJobComponent, {
      data: { jobTitle, companyName }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.jobseekerId) {
        this._reportedJobService.reportJob(this.companyId, jobId, this.jobseekerId, result.reason, result.description).subscribe({
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

  getJobDetails(jobId: string | undefined): void {
    this._router.navigate(['/jobseeker/job-details'], { queryParams: { jobId: jobId } })
  }








}
