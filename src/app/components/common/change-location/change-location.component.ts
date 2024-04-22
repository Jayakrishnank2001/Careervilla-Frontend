import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Country, State } from 'country-state-city';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { LocationService } from 'src/app/services/location.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.component.html',
  styleUrls: ['./change-location.component.css'],
  standalone: true,
  imports:[ReactiveFormsModule,CommonModule,MaterialModule,FormsModule]
})
export class ChangeLocationComponent implements OnInit{

  form!: FormGroup
  countries: string[] = []
  states: string[] = []
  cities: string[] = []
  selectedCountry!: string;

  constructor(private _locationService: LocationService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<ChangeLocationComponent>) { }
  
  ngOnInit(): void {
    this.countries = this._locationService.getCountries()
    this.form = this._fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    })
  }

  getCountryCode(countryName: string): string | undefined {
    const countries = Country.getAllCountries();
    const country = countries.find((c) => c.name === countryName);
    return country?.isoCode;
  }

  getStateCode(countryCode: string, stateName: string): string | undefined {
    const states = State.getStatesOfCountry(countryCode);
    const state = states.find((s) => s.name === stateName);
    return state?.isoCode;
  }

  onCountryChange(event: MatSelectChange): void {
    const countryName = event.value;
    const countryCode = this.getCountryCode(countryName);
    if (countryCode) {
      this.selectedCountry = countryCode;
      this.states = this._locationService.getStates(countryCode);
    }
  }

  onStateChange(countryCode: string, event: MatSelectChange): void {
    const stateName = event.value;
    const stateCode = this.getStateCode(countryCode, stateName);
    if (stateCode) {
      this.cities = this._locationService.getCities(countryCode, stateCode);
    }
  }

  get isFormValid(): boolean {
    return this.form.valid
  }


  onSubmit(): void{
    this._dialogRef.close(this.form.value)
  }

}
