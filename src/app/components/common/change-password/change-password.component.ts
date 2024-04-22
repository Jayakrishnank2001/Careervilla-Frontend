import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { passwordMatchValidator, validateByTrimming } from 'src/app/helpers/validations';
import { passwordValidators } from 'src/app/shared/validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MaterialModule]
})
export class ChangePasswordComponent implements OnInit {

  form!: FormGroup
  hideConfirmPassword:boolean=true

  constructor(private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      newPassword: ['', [validateByTrimming(passwordValidators)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator })
  }


  onSubmit(): void {
    this._dialogRef.close(this.form.value)
  }

  get isFormValid(): boolean {
    return this.form?.valid &&
      this.form?.get('newPassword')?.value === this.form?.get('confirmPassword')?.value;
  }




}
