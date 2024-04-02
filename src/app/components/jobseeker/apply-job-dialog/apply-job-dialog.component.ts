import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobseekerService } from 'src/app/services/jobseeker.service';

@Component({
  selector: 'app-apply-job-dialog',
  templateUrl: './apply-job-dialog.component.html',
  styleUrls: ['./apply-job-dialog.component.css']
})
export class ApplyJobDialogComponent implements OnInit {

  form!: FormGroup
  jobId!: string
  jobseekerId!: string
  jobseekerResume!: string | undefined
  jobseekerName!: string | undefined

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<ApplyJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobId: string, jobseekerId: string },
    private jobseekerService: JobseekerService) { 
    
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
        this.jobseekerName = res.firstName
      }
    })
  }

  onSubmit(): void {

  }

}
