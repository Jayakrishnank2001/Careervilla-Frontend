import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Country,State } from 'country-state-city';
import { MatSelectChange } from '@angular/material/select';
import { LocationService } from 'src/app/services/location.service';
import { ICompany } from 'src/app/models/company';

@Component({
  selector: 'app-add-company-dialog',
  templateUrl: './add-company-dialog.component.html',
  styleUrls: ['./add-company-dialog.component.css']
})
export class AddCompanyDialogComponent implements OnInit{

  countries: string[] = []
  states: string[] = []
  cities: string[] = []
  selectedCountry!: string;
  form!:FormGroup

  constructor(private dialogRef: MatDialogRef<AddCompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{editMode:boolean,company:ICompany},
    private fb: FormBuilder,
    private locationService: LocationService) { }
  
  ngOnInit(): void {
    this.countries = this.locationService.getCountries()
    this.form = this.fb.group({
      companyName: [this.data.editMode?this.data.company.companyName: '', Validators.required],
      website: [this.data.editMode?this.data.company.website: '', Validators.required],
      companySize:[this.data.editMode?this.data.company.companySize:'',Validators.required],
      email: [this.data.editMode?this.data.company.email:'', Validators.required],
      industry: [this.data.editMode?this.data.company.industry:'', Validators.required],
      foundedYear: [this.data.editMode?this.data.company.foundedYear:'', Validators.required],
      description: [this.data.editMode?this.data.company.description:'', Validators.required],
      address:[this.data.editMode?this.data.company.addressId?.address:'',Validators.required],
      country: [this.data.editMode?this.data.company.addressId?.country:'', Validators.required],
      state: [this.data.editMode?this.data.company.addressId?.state:'', Validators.required],
      city:[this.data.editMode?this.data.company.addressId?.city:'',Validators.required]
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
      this.states = this.locationService.getStates(countryCode);
    }
  }

  onStateChange(countryCode: string, event: MatSelectChange): void {
    const stateName = event.value;
    const stateCode = this.getStateCode(countryCode, stateName);
    if (stateCode) {
      this.cities = this.locationService.getCities(countryCode, stateCode);
    }
  }

  onSubmit(): void{
    this.dialogRef.close(this.form.value)
  }

}
