import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlansDialogData, ISubscriptionRes } from 'src/app/models/subscriptionPlan';

@Component({
  selector: 'app-admin-plans-dialog',
  templateUrl: './admin-plans-dialog.component.html',
  styleUrls: ['./admin-plans-dialog.component.css']
})
export class AdminPlansDialogComponent{

  newPlanForm: FormGroup

  constructor(private _dialogRef: MatDialogRef<AdminPlansDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPlansDialogData,
    private _fb: FormBuilder) {
    
    this.newPlanForm = this._fb.group({
      planName: [data.editMode ? data.plans.find((plan: ISubscriptionRes) => plan._id === data.planId)?.planName : '', Validators.required],
      amount: [data.editMode ? data.plans.find((plan: ISubscriptionRes) => plan._id === data.planId)?.amount : '', Validators.required],
      duration: [data.editMode ? data.plans.find((plan: ISubscriptionRes) => plan._id === data.planId)?.duration : '', Validators.required],
      status: [data.editMode ? data.plans.find((plan: ISubscriptionRes) => plan._id === data.planId)?.status : '', Validators.required],
    })
  }

  onSubmit(): void{
    this._dialogRef.close(this.newPlanForm.value)
  }

}
