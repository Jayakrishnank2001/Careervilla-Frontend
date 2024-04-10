import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IJobRes } from 'src/app/models/job';
import { AuthService } from 'src/app/services/auth.service';
import { EmployerService } from 'src/app/services/employer.service';
import { JobService } from 'src/app/services/job.service';
import Swal from 'sweetalert2';
import { EditJobDialogComponent } from '../edit-job-dialog/edit-job-dialog.component';

@Component({
  selector: 'app-employer-manage-jobs',
  templateUrl: './employer-manage-jobs.component.html',
  styleUrls: ['./employer-manage-jobs.component.css']
})
export class EmployerManageJobsComponent implements OnInit {

  postedJobs: IJobRes[] = []
  employerId!: string | null
  job: IJobRes = {}

  constructor(private employerService: EmployerService,
    private authService: AuthService,
    private jobService: JobService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.employerId = this.authService.extractUserIdFromToken('employerToken')
    this.getPostedJobs(this.employerId)
  }

  getPostedJobs(employerId: string | null): void {
    if (employerId) {
      this.employerService.getPostedJobs(employerId).subscribe({
        next: (res) => {
          this.postedJobs = res
        }
      })
    }
  }

  onEditJob(jobId: string | undefined): void {
    if (jobId) {
      this.jobService.getJobDetails(jobId).subscribe({
        next: (res) => {
          this.job = res
          console.log(this.job)
        }
      })
      setTimeout(() => {
        this.openDialog(jobId)
      }, 1000)
    }
  }

  openDialog(jobId: string): void {
    const dialogRef = this.dialog.open(EditJobDialogComponent, {
      data: this.job
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getPostedJobs(this.employerId)
    })
  }

  changeJobStatus(jobId: string | undefined, action: 'Deactivate' | 'Activate'): void {
    void Swal.fire({
      title: `Do you want to ${action} this Job ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed && jobId) {
        this.jobService.updateJobStatus(jobId).subscribe({
          next: (res) => {
            if (res.data.success == true) {
              this.getPostedJobs(this.employerId)
              this.snackBar.open('Job Status updated', 'Close', {
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
