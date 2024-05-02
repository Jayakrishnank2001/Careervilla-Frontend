import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IJobRes } from 'src/app/models/job';
import { IJobApplication } from 'src/app/models/jobApplication';
import { AuthService } from 'src/app/services/auth.service';
import { EmployerService } from 'src/app/services/employer.service';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { RejectionReasonDialogComponent } from '../rejection-reason-dialog/rejection-reason-dialog.component';

@Component({
  selector: 'app-employer-manage-candidates',
  templateUrl: './employer-manage-candidates.component.html',
  styleUrls: ['./employer-manage-candidates.component.css']
})
export class EmployerManageCandidatesComponent implements OnInit {

  postedJobs: IJobRes[] = []
  jobApplications: IJobApplication[] = []
  employerId!: string | null
  selectedJob!: IJobRes
  jobControll = new FormControl()
  defaultOption = { jobTitle: 'Select a job' };
  selectedButton: string = 'Total';
  viewPage:boolean=false

  constructor(
    @Inject(AuthService) private _authService: AuthService,
    @Inject(EmployerService) private _employerService: EmployerService,
    @Inject(JobApplicationService) private _jobApplicationService: JobApplicationService,
    @Inject(MatSnackBar) private _snackbar: MatSnackBar,
    @Inject(Router) private _router: Router,
    @Inject(MatDialog) private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.employerId = this._authService.extractUserIdFromToken('employerToken')
    this.getPostedJobs(this.employerId)
  }

  getPostedJobs(employerId: string | null): void {
    if (employerId) {
      this._employerService.getPostedJobs(employerId).subscribe({
        next: (res) => {
          this.postedJobs = res
          this.onSelectJob(this.postedJobs[0])
          this.postedJobs.reverse()
          this.viewPage=true
        }
      })
    }
  }

  onSelectJob(event: IJobRes): void {
    this.selectedJob = event
    if (this.selectedJob._id)
      this._jobApplicationService.getJobApplications(this.selectedJob._id).subscribe({
        next: (res) => {
          this.jobApplications = res
          this.jobApplications.reverse()
        }
      })
  }

  onViewResume(resume: string) {
    window.open(resume)
  }

  onChangeApplicationStatus(applicationId: string | undefined, status: string): void {
    if (applicationId)
      this._jobApplicationService.rejectAndApproveApplication(applicationId, status).subscribe({
        next: (res) => {
          if (res.success == true) {
            this._snackbar.open(`Job Application is ${status}`, 'Close', {
              duration: 5000,
              verticalPosition: 'top'
            })
          }
          this.onGetApplications(this.selectedJob._id,(status==='Approved')?'Rejected':'Approved')
        }
      })
  }

  onGetApplications(jobId: string | undefined, status?: string) {
    this.selectedButton = status ? status : 'Total';
    if (jobId)
      this._jobApplicationService.getJobApplications(jobId, status).subscribe({
        next: (res) => {
          this.jobApplications = res
          this.jobApplications.reverse()
        }
      })
  }

  messageCandidate(jobseekerId: string | undefined, firstName: string | undefined, lastName: string | undefined, image: string | undefined): void {
    const queryParams = { jobseekerId: jobseekerId, firstName: firstName, lastName: lastName, image: image }
    this._router.navigate(['/employer/messages'], { queryParams })
  }

  openRejectionDialog(reason?: string, applicationId?: string): void {
    const dialogRef = this._dialog.open(RejectionReasonDialogComponent, {
      data: { rejectionReason: reason }
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (applicationId)
        this._jobApplicationService.addRejectionReason(applicationId, result.rejectionReason).subscribe({
          next: (res) => {
            if (res.success === true) {
              this._snackbar.open('Rejection reason added', 'Close', {
                duration: 5000,
                verticalPosition: 'top'
              })
            }
            this.onGetApplications(this.selectedJob._id,'Rejected')
          }
        })
    })
  }



}
