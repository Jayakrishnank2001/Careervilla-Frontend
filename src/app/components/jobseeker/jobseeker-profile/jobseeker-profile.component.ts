import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IJobseekerRes } from 'src/app/models/jobseeker';
import { AuthService } from 'src/app/services/auth.service';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-jobseeker-profile',
  templateUrl: './jobseeker-profile.component.html',
  styleUrls: ['./jobseeker-profile.component.css']
})
export class JobseekerProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('resumeInput') resumeInput!: ElementRef<HTMLInputElement>;

  userData: IJobseekerRes = {}
  jobseekerId!: string | null

  constructor(private authService: AuthService,
    private jobseekerService: JobseekerService,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar) {

    this.jobseekerId = this.authService.extractUserIdFromToken('jobseekerToken')

  }

  ngOnInit(): void {
    this.jobseekerProfile()
  }

  jobseekerProfile(): void {
    if (this.jobseekerId)
      this.jobseekerService.getJobseekerDetails(this.jobseekerId).subscribe({
        next: (res) => {
          this.userData = res
        }
      })
  }

  openFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const filePath = `Jobseeker/profile-Photo/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          if (this.jobseekerId) {
            this.jobseekerService.updatePhoto(this.jobseekerId, url).subscribe({
              next: (res) => {
                if (res.data.success == true) {
                  this.ngOnInit()
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

  openResumeInput(input: HTMLInputElement): void {
    input.click()
  }

  onResumeSelected(event: any): void {
    const file = event.target.files[0]
    const filePath = `Jobseeker/resume/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          if (this.jobseekerId) {
            this.jobseekerService.addResume(this.jobseekerId, url).subscribe({
              next: (res) => {
                if (res.data.success == true) {
                  this.ngOnInit()
                  this.snackBar.open('Resume added successfully', 'Close', {
                    duration: 5000,
                    verticalPosition: 'top',
                  })
                }
              }
            })
          }
        })
      })
    ).subscribe()
  }

  showResume(resume: string): void {
    window.location.href = resume;
  }

  deleteResume(): void {
    void Swal.fire({
      title: 'Do you want to delete this resume ?',
      text:'This resume will no longer be available when you apply for jobs.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'No, Cancel'
    }).then(result => {
      if (result.isConfirmed && this.jobseekerId) {
        this.jobseekerService.deleteResume(this.jobseekerId).subscribe({
          next: (res) => {
            if (res.data.success == true) {
              this.ngOnInit()
              this.snackBar.open('Resume deleted successfully', 'Close', {
                duration: 5000,
                verticalPosition: 'top',
              })
            }
          }
        })
      }
    })
  }

}
