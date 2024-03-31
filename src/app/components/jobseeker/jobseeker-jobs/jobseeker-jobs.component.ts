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

@Component({
  selector: 'app-jobseeker-jobs',
  templateUrl: './jobseeker-jobs.component.html',
  styleUrls: ['./jobseeker-jobs.component.css']
})
export class JobseekerJobsComponent {

  jobs: IJobRes[] = []
  selectJob: IJobRes = {}

  constructor(private breakpointObserver: BreakpointObserver,
    private jobService: JobService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private reportedJobService: ReportedJobService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getJobs()
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
      const jobseekerId = this.authService.extractUserIdFromToken('jobseekerToken')
      if (result && jobseekerId) {
        this.reportedJobService.reportJob(this.selectJob.companyId?._id, this.selectJob._id, jobseekerId, result.reason, result.description).subscribe({
          next: (res) => {
            if (res.success == true) {
              this.snackBar.open('Job reported successfully', 'Close', {
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
