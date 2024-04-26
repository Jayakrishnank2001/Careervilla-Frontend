import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IEmployerRes } from 'src/app/models/employer';
import { AuthService } from 'src/app/services/auth.service';
import { EmployerService } from 'src/app/services/employer.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { ICompany } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyDialogComponent } from '../add-company-dialog/add-company-dialog.component';
import { PlanDialogComponent } from '../plan-dialog/plan-dialog.component';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>
  @ViewChild('companyLogo') companyLog!: ElementRef<HTMLInputElement>

  userData: IEmployerRes = {}
  companyDetails: ICompany = {}
  employerId!: string | null

  constructor(private authService: AuthService,
    private employerService: EmployerService,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar,
    private companyService: CompanyService,
    private dialog: MatDialog) { 
    
    this.employerId=this.authService.extractUserIdFromToken('employerToken')
    }

  ngOnInit(): void {
    this.employerProfile()
  }

  employerProfile(): void {
    if (this.employerId)
      this.employerService.getEmployerDetails(this.employerId).subscribe({
        next: (res) => {
          this.userData = res
          this.getCompanyData(this.userData.companyId?._id)
        }
      })
  }

  getCompanyData(companyId: string | undefined): void{
    if(companyId)
      this.companyService.getCompanyDetails(companyId).subscribe({
        next: (res) => {
          this.companyDetails = res
        }
      })
    
  }

  openFileInput(fileInput: any): void{
    fileInput.click()
  }

  onFileSelected(event: any): void{
    const file = event.target.files[0];
    const filePath = `Employer/profile-photo/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          if (this.employerId) {
            this.employerService.updatePhoto(this.employerId, url).subscribe({
              next: (res) => {
                if (res.data.success == true) {
                  this.employerProfile()
                  this.snackBar.open('Profile photo updated successfully', 'Close', {
                    duration: 5000,
                    verticalPosition: 'top',
                  })
                }
              }
            })
          }
        });
      })
    ).subscribe();
  }

  onCompanyPhoto(event: any): void{
    const file = event.target.files[0];
    const filePath = `Employer/company-logo/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          if(this.userData.companyId?._id)
          this.companyService.updateCompanyLogo(this.userData.companyId?._id, url).subscribe({
            next: (res) => {
              if (res.data.success == true) {
                this.getCompanyData(this.userData.companyId?._id)
                this.snackBar.open('Company logo changed', 'Close', {
                  duration: 5000,
                  verticalPosition:'top'
                })
              }
            }
          })
        });
      })
    ).subscribe();
  }

  onAddCompany(): void{
    this.openDialog(false)
  }

  onEditCompany(): void{
    this.openDialog(true)
  }

  openDialog(editMode:boolean): void{
    const dialogRef = this.dialog.open(AddCompanyDialogComponent, {
      data: {editMode,company:this.companyDetails}
    })
    dialogRef.afterClosed().subscribe((result:ICompany) => {
      if (result && !editMode && this.employerId) {
        this.companyService.saveCompany(result,this.employerId).subscribe({
          next: (res) => {
            if (res.data.success == true) {
              this.ngOnInit()
              this.snackBar.open('Company added successfully', 'Close', {
                duration: 5000,
                verticalPosition:'top'
              })
            }
           }
        })
      } else {
        if (this.companyDetails._id && this.companyDetails.addressId?._id)
          this.companyService.editCompany(result,this.companyDetails._id,this.companyDetails.addressId?._id).subscribe({
            next: (res) => {
              if (res.data.success == true) {
                this.ngOnInit()
                this.snackBar.open('Company details updated', 'Close', {
                  duration: 5000,
                  verticalPosition:'top'
                })
              }
          }
        })
      }
    })
  }

  getPlanDetails(): void{
    const dialogRef=this.dialog.open(PlanDialogComponent)
  }






}
