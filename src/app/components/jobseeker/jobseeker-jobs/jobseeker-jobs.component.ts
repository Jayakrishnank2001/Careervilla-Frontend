import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { IJobRes, JobSearchQuery } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { ReportJobComponent } from '../../common/report-job/report-job.component';
import { ReportedJobService } from 'src/app/services/reported-job.service';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { ApplyJobDialogComponent } from '../apply-job-dialog/apply-job-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IIndustry } from 'src/app/models/industry';
import { IndustryService } from 'src/app/services/industry.service';

@Component({
  selector: 'app-jobseeker-jobs',
  templateUrl: './jobseeker-jobs.component.html',
  styleUrls: ['./jobseeker-jobs.component.css']
})
export class JobseekerJobsComponent implements OnInit {

  jobs: IJobRes[] = []
  selectJob: IJobRes = {}
  savedJobs: (string | undefined)[] = []
  appliedJobs: (string | undefined)[] = []
  jobseekerId!: string | null
  page: number = 1;
  pageSize: number = 3;
  hasMorePages: boolean = true;
  hasPreviousPages: boolean = false
  industries: IIndustry[] = []
  searchQuery: JobSearchQuery = {
    jobTitle: '',
    location: '',
    experience: '',
    industryName: '',
    jobType: ''
  }


  constructor(
    @Inject(BreakpointObserver) private _breakpointObserver: BreakpointObserver,
    @Inject(JobService) private _jobService: JobService,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    @Inject(MatDialog) private _dialog: MatDialog,
    @Inject(ReportedJobService) private _reportedJobService: ReportedJobService,
    @Inject(AuthService) private _authService: AuthService,
    @Inject(JobseekerService) private _jobseekerService: JobseekerService,
    @Inject(Router) private _router: Router,
    @Inject(ActivatedRoute) private _route: ActivatedRoute,
    @Inject(IndustryService) private _industryService: IndustryService) { }

  ngOnInit(): void {
    this.jobseekerId = this._authService.extractUserIdFromToken('jobseekerToken')
    this._route.queryParams.subscribe(params => {
      this.searchQuery.jobTitle = params['jobTitle']
      this.searchQuery.location = params['location']
      this.searchQuery.experience = params['experience']
    })
    this.getJobs()
    this.getSavedJobs()
    this.getIndustries()
  }

  isSmallScreen = this._breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches)
    );

  getJobs(): void {
    if (this.jobseekerId)
      this._jobService.getJobs(this.page, this.pageSize, undefined, this.searchQuery, this.jobseekerId).subscribe({
        next: (res) => {
          this.jobs = res
          this.selectJob = this.jobs[0]
          if (this.jobs.length < 3) {
            this.hasMorePages = false
          }
          this.searchQuery.experience = ''
        }
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
    const dialogRef = this._dialog.open(ReportJobComponent, {
      data: { jobTitle, companyName }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.jobseekerId) {
        this._reportedJobService.reportJob(this.selectJob.companyId?._id, this.selectJob._id, this.jobseekerId, result.reason, result.description).subscribe({
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

  onSaveJob(jobId: string | undefined): void {
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

  onUnsaveJob(jobId: string | undefined): void {
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

  onApplyJob(jobId: string | undefined): void {
    if (jobId)
      this._jobService.getJobDetails(jobId).subscribe({
        next: (res) => {
          if (res.status === 'Active' && res.isBlocked === false) {
            const dialogRef = this._dialog.open(ApplyJobDialogComponent, {
              data: { jobId, jobseekerId: this.jobseekerId }
            })
            dialogRef.afterClosed().subscribe(result => {
              this.getSavedJobs()
            })
          } else {
            this._snackBar.open('Job not found', 'Close', {
              duration: 3000,
              verticalPosition: 'top'
            })
            this.getJobs()
          }
        }
      })
  }

  goToPreviousPage(): void {
    if (this.page > 1) {
      this.page -= 1;
      this.getJobs();
    }
    if (this.page == 1) {
      this.hasPreviousPages = false
    }
    this.hasMorePages = true
  }

  goToNextPage(): void {
    this.page += 1;
    this.getJobs();
    this.hasPreviousPages = true
  }

  goCompanyPage(companyId: string | undefined): void {
    this._router.navigate(['/jobseeker/company'], { queryParams: { companyId: companyId } })
  }

  jobDetails(jobId: string | undefined): void {
    this._router.navigate(['/jobseeker/job-details'], { queryParams: { jobId: jobId } })
  }

  getIndustries(): void {
    this._industryService.getAllIndustries('jobseeker').subscribe({
      next: (res) => {
        this.industries = res.data?.industries || []
      }
    })
  }

  onIndustryChange(industry: string): void {
    this.searchQuery.industryName = industry
    this.getJobs()
  }

  onJobTypeChange(jobType: string): void {
    this.searchQuery.jobType = jobType
    this.getJobs()
  }





}
