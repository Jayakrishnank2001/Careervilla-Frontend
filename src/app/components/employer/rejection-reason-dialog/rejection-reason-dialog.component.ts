import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rejection-reason-dialog',
  templateUrl: './rejection-reason-dialog.component.html',
  styleUrls: ['./rejection-reason-dialog.component.css']
})
export class RejectionReasonDialogComponent {

  reasonForm!: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { rejectionReason: string },
    @Inject(MatDialogRef) private _dialogRef: MatDialogRef<RejectionReasonDialogComponent>,
    @Inject(FormBuilder) private _fb: FormBuilder) {

    this.reasonForm = this._fb.group({
      rejectionReason: [data.rejectionReason ? data.rejectionReason : '', Validators.required]
    })
  }

  onSubmit(): void {
    this._dialogRef.close(this.reasonForm.value)
  }





}
