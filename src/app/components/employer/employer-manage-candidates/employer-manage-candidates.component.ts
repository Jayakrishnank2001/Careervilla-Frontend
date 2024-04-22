import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IJobRes } from 'src/app/models/job';
import { IJobApplication } from 'src/app/models/jobApplication';
import { AuthService } from 'src/app/services/auth.service';
import { EmployerService } from 'src/app/services/employer.service';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-employer-manage-candidates',
  templateUrl: './employer-manage-candidates.component.html',
  styleUrls: ['./employer-manage-candidates.component.css']
})
export class EmployerManageCandidatesComponent implements OnInit {

  postedJobs: IJobRes[] = []
  jobApplications:IJobApplication[]=[]
  employerId!: string | null
  selectedJob!: IJobRes
  jobControll = new FormControl()
  defaultOption = { jobTitle: 'Select a job' };

  constructor(private authService: AuthService,
    private employerService: EmployerService,
    private jobApplicationService: JobApplicationService,
  private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.employerId = this.authService.extractUserIdFromToken('employerToken')
    this.getPostedJobs(this.employerId)
  }

  getPostedJobs(employerId: string | null): void {
    if (employerId) {
      this.employerService.getPostedJobs(employerId).subscribe({
        next: (res) => {
          this.postedJobs = res
          this.postedJobs.reverse()
        }
      })
    }
  }

  onSelectJob(event: IJobRes): void {
    this.selectedJob = event
    if(this.selectedJob._id)
    this.jobApplicationService.getJobApplications(this.selectedJob._id).subscribe({
      next: (res) => {
        this.jobApplications = res
        this.jobApplications.reverse()
      }
    })
  }

  onViewResume(resume: string) {
    window.open(resume)
  }

  onChangeApplicationStatus(applicationId: string | undefined, status: string): void{
    if(applicationId)
    this.jobApplicationService.rejectAndApproveApplication(applicationId, status).subscribe({
      next: (res) => {
        if (res.success == true) {
          this.snackbar.open(`Job Application is ${status}`, 'Close', {
            duration: 5000,
            verticalPosition:'top'
          })
        }
      }
    })
  }

  onGetApplications(jobId: string | undefined, status?: string) {
    if(jobId)
    this.jobApplicationService.getJobApplications(jobId, status).subscribe({
      next: (res) => {
        this.jobApplications = res
        this.jobApplications.reverse()
      }
    })
  }



}
