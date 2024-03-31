import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-report-job',
  templateUrl: './report-job.component.html',
  styleUrls: ['./report-job.component.css'],
  standalone: true,
  imports:[MaterialModule,ReactiveFormsModule, CommonModule, FormsModule]
})
export class ReportJobComponent implements OnInit{

  form!: FormGroup
  jobTitle!: string
  companyName!:string

  constructor(private dialogRef: MatDialogRef<ReportJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobTitle: string, companyName: string },
    private fb: FormBuilder) { 
    
    this.jobTitle = data.jobTitle
    this.companyName=data.companyName
    }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      reason: ['', Validators.required],
      description:['']
    })
  }

  get isFormValid(): boolean {
    return this.form.valid
  }
  
  onSubmit(): void{
    this.dialogRef.close(this.form.value)
  }

}
