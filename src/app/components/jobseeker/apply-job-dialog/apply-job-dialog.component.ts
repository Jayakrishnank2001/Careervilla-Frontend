import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobseekerService } from 'src/app/services/jobseeker.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobApplicationService } from 'src/app/services/job-application.service';


@Component({
  selector: 'app-apply-job-dialog',
  templateUrl: './apply-job-dialog.component.html',
  styleUrls: ['./apply-job-dialog.component.css']
})
export class ApplyJobDialogComponent implements OnInit {

  @ViewChild('resumeInput') resumeInput!: ElementRef<HTMLInputElement>;

  form!: FormGroup
  jobId!: string
  jobseekerId!: string
  jobseekerResume!: string | undefined
  resumeName!:string|undefined

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<ApplyJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobId: string, jobseekerId: string },
    private jobseekerService: JobseekerService,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar,
    private jobApplicationService: JobApplicationService) { 
    
      this.jobseekerId = this.data.jobseekerId
      this.jobId = this.data.jobId
    }

  ngOnInit(): void {
    this.getUserResume()
    this.form = this.fb.group({
      qualification: ['', Validators.required],
      experience: ['', Validators.required]
    })
  }

  getUserResume(): void {
    this.jobseekerService.getJobseekerDetails(this.jobseekerId).subscribe({
      next: (res) => {
        this.jobseekerResume = res.resume
        this.resumeName = res.firstName+'(Resume)'
      }
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const data = this.form.getRawValue()
      const jobApplicationData = { ...data, jobId: this.jobId, jobseekerId: this.jobseekerId, resume: this.jobseekerResume }
      this.jobApplicationService.applyJob(jobApplicationData).subscribe({
        next: (res) => {
          if (res.success == true) {
            this.snackBar.open('Job applied successfully', 'Close', {
              duration: 5000,
              verticalPosition:'top'
            })
            this.dialogRef.close()
          }
        }
      })
    }
  }

  onViewResume(event: Event): void{
    event.preventDefault()
    if (this.jobseekerResume) {
      window.open(this.jobseekerResume)
    }
  }

  openResumeInput(event: Event, input: HTMLInputElement): void {
    event.preventDefault()
    input.click()
  }

  onResumeSelected(event: any): void{
    const file = event.target.files[0]
    const filePath = `Jobseeker/resume/${file.name}`
    const fileRef = this.storage.ref(filePath)
    const task = this.storage.upload(filePath, file)
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.jobseekerResume = url
          this.snackBar.open('New resume uploaded', 'Close', {
            duration: 5000,
            verticalPosition:'top'
          })
          this.resumeName=file.name
        })
      })
    ).subscribe()
  }




}
