import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IJobseekerRes } from 'src/app/models/jobseeker';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import Swal from 'sweetalert2';
import { ChangePasswordComponent } from '../../common/change-password/change-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePhoneNumberComponent } from '../../common/change-phone-number/change-phone-number.component';
import { ChangeLocationComponent } from '../../common/change-location/change-location.component';

@Component({
  selector: 'app-jobseeker-settings',
  templateUrl: './jobseeker-settings.component.html',
  styleUrls: ['./jobseeker-settings.component.css']
})
export class JobseekerSettingsComponent implements OnInit{

  userData:IJobseekerRes={}

  constructor(private router: Router,
    private authService: AuthService,
    private jobseekerService: JobseekerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.jobseekerDetails()
  }

  jobseekerDetails(): void{
    const jobseekerId = this.authService.extractUserIdFromToken('jobseekerToken')
    if(jobseekerId)
    this.jobseekerService.getJobseekerDetails(jobseekerId).subscribe({
      next: (res) => {
        this.userData=res
      }

    })
  }

  onLogOut(): void {
    void Swal.fire({
      title: 'Do you want to Logout ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'No, Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        setTimeout(() => {
          window.location.reload()
        })
        this.authService.clearToken('jobseekerToken')
        void this.router.navigate(['/jobseeker/login'])
      }
    })
  }

  onChangePassword(): void{
    this.openDialog()
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(ChangePasswordComponent)
    dialogRef.afterClosed().subscribe(result => {
      const jobseekerEmail = this.authService.extractUserEmailFromToken('jobseekerToken')
      if (result && jobseekerEmail) {
        this.jobseekerService.changePassword(jobseekerEmail, result.newPassword, result.confirmPassword).subscribe({
          next: (res) => {
            if (res.success == true) {
              this.snackBar.open('Password Updated Successfully', 'Close', {
                duration: 5000,
                verticalPosition: 'top',
              })
            }
          }
        })

      }
    })
  }

  onChangePhoneNumber(): void{
    this.changePhoneNumberDialog()
  }

  changePhoneNumberDialog(): void{
    const dialogRef = this.dialog.open(ChangePhoneNumberComponent)
    dialogRef.afterClosed().subscribe(result => {
      const jobseekerId = this.authService.extractUserIdFromToken('jobseekerToken')
      if (result && jobseekerId) {
        const mobileNumber = result.countryCode +' '+ result.phoneNumber
        this.jobseekerService.changePhoneNumber(jobseekerId, mobileNumber).subscribe({
          next: (res) => {
            if (res.data.success == true) {
              this.snackBar.open('Phone Number Updated Successfully', 'Close', {
                duration: 5000,
                verticalPosition: 'top',
              })
              this.ngOnInit()
            }
          }
        })
      }
    })
  }

  onChangeLocation(): void{
    this.changeLocationDialog()
  }

  changeLocationDialog(): void {
    const dialogRef = this.dialog.open(ChangeLocationComponent)
    dialogRef.afterClosed().subscribe(result => {
      const jobseekerId = this.authService.extractUserIdFromToken('jobseekerToken')
      if (result && jobseekerId) {
        const location = result.country +', '+ result.state +', '+ result.city
        this.jobseekerService.changeLocation(jobseekerId, location).subscribe({
          next: (res) => {
            if (res.data.success == true) {
              this.snackBar.open('Location Updated Successfully', 'Close', {
                duration: 5000,
                verticalPosition: 'top',
              })
              this.ngOnInit()
            }
          }
        })
      }
    })
  }

}
