import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IIndustry, IIndustryDialogData } from 'src/app/models/industry';

@Component({
  selector: 'app-admin-industry-dialog',
  templateUrl: './admin-industry-dialog.component.html',
  styleUrls: ['./admin-industry-dialog.component.css']
})
export class AdminIndustryDialogComponent {

  newIndustryForm: FormGroup

  constructor(
    @Inject(MatDialogRef) private _dialogRef: MatDialogRef<AdminIndustryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IIndustryDialogData,
    @Inject(FormBuilder) private _fb: FormBuilder) { 
    
    this.newIndustryForm = this._fb.group({
      industryName: [data.editMode ? data.industries.find((industry: IIndustry) => industry._id === data.industryId)?.industryName : '', Validators.required],
      description: [data.editMode ? data.industries.find((industry: IIndustry) => industry._id === data.industryId)?.description : '', Validators.required],
      status: [data.editMode ? data.industries.find((industry: IIndustry) => industry._id === data.industryId)?.status : '', Validators.required],
    })
  }
  
  onSubmit(): void{
    this._dialogRef.close(this.newIndustryForm.value)
  }
  


}
