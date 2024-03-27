import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IEmployerRes } from 'src/app/models/employer';
import { AuthService } from 'src/app/services/auth.service';
import { EmployerService } from 'src/app/services/employer.service';
import Swal from 'sweetalert2';
import { ChangePasswordComponent } from '../../common/change-password/change-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePhoneNumberComponent } from '../../common/change-phone-number/change-phone-number.component';
import { ChangeLocationComponent } from '../../common/change-location/change-location.component';

@Component({
  selector: 'app-employer-settings',
  templateUrl: './employer-settings.component.html',
  styleUrls: ['./employer-settings.component.css']
})
export class EmployerSettingsComponent implements OnInit {

  userData: IEmployerRes = {}

  constructor(private authService: AuthService,
    private employerService: EmployerService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.employerDetails()
  }

  employerDetails(): void {
    const employerId = this.authService.extractUserIdFromToken('employerToken')
    if (employerId)
      this.employerService.getEmployerDetails(employerId).subscribe({
        next: (res) => {
          this.userData = res
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
        this.authService.clearToken('employerToken')
        void this.router.navigate(['/employer/login'])
      }
    })
  }

  onChangePassword(): void {
    this.changePasswordDialog()
  }

  changePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent)
    dialogRef.afterClosed().subscribe(result => {
      const employerEmail = this.authService.extractUserEmailFromToken('employerToken')
      if (result && employerEmail) {
        this.employerService.changePassword(employerEmail, result.newPassword, result.confirmPassword).subscribe({
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
      const employerId = this.authService.extractUserIdFromToken('employerToken')
      if (result && employerId) {
        const mobileNumber = result.countryCode +' '+ result.phoneNumber
        this.employerService.changePhoneNumber(employerId, mobileNumber).subscribe({
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
      const employerId = this.authService.extractUserIdFromToken('employerToken')
      if (result && employerId) {
        const location = result.country +', '+ result.state +', '+ result.city
        this.employerService.changeLocation(employerId, location).subscribe({
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
