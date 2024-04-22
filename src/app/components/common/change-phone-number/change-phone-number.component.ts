import { Component, OnInit } from '@angular/core';
import CountryList from 'country-list-with-dial-code-and-flag';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { validateByTrimming } from 'src/app/helpers/validations';
import { mobileValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-change-phone-number',
  templateUrl: './change-phone-number.component.html',
  styleUrls: ['./change-phone-number.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MaterialModule]
})
export class ChangePhoneNumberComponent implements OnInit {

  form!: FormGroup

  countries = CountryList.getAll()

  constructor(private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<ChangePhoneNumberComponent>) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      countryCode: ['', Validators.required],
      phoneNumber: ['', [validateByTrimming(mobileValidators)]]
    })
  }


  onSubmit(): void {
    this._dialogRef.close(this.form.value)
  }

  get isFormValid(): boolean {
    return this.form.valid
  }

}
