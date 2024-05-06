import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from 'src/app/services/job.service';
import { LocationService } from 'src/app/services/location.service';
import { Country, State } from 'country-state-city';
import { MatSelectChange } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IJobRes } from 'src/app/models/job';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IIndustry } from 'src/app/models/industry';
import { IndustryService } from 'src/app/services/industry.service';

@Component({
  selector: 'app-edit-job-dialog',
  templateUrl: './edit-job-dialog.component.html',
  styleUrls: ['./edit-job-dialog.component.css']
})
export class EditJobDialogComponent implements OnInit {

  countries: string[] = []
  states: string[] = []
  cities: string[] = []
  form!: FormGroup
  industries: IIndustry[] = []
  selectedCountry!: string;

  constructor(
    @Inject(LocationService) private locationService: LocationService,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(JobService) private jobService: JobService,
    @Inject(MatDialogRef) private dialogRef: MatDialogRef<EditJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IJobRes,
    @Inject(MatSnackBar) private snackBar: MatSnackBar,
    @Inject(IndustryService) private _industryService: IndustryService) { }

  ngOnInit(): void {
    this.countries = this.locationService.getCountries()
    this.getIndustries()
    console.log(this.data)
    this.form = this.formBuilder.group({
      jobTitle: [this.data.jobTitle, Validators.required],
      companyName: [this.data.companyId?.companyName, Validators.required],
      jobDescription: [this.data.jobDescription, Validators.required],
      email: [this.data.email, Validators.required],
      jobType: [this.data.jobType, Validators.required],
      salary: [this.data.salary, Validators.required],
      specialisms: [this.data.specialisms, Validators.required],
      experience: [this.data.experience, Validators.required],
      gender: [this.data.gender],
      industryName: [this.data.industry?.industryName, Validators.required],
      applicationDeadline: [this.data.applicationDeadline, Validators.required],
      address: [this.data.addressId?.address, Validators.required],
      country: [this.data.addressId?.country, Validators.required],
      state: [this.data.addressId?.state, Validators.required],
      city: [this.data.addressId?.city, Validators.required]
    })
  }

  getIndustries(): void {
    this._industryService.getAllIndustries('employer').subscribe({
      next: (res) => {
        this.industries = res.data?.industries || []
      }
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

  onSubmit(): void {
    if (this.data._id && this.data.addressId?._id)
      this.jobService.updateJob(this.form.value, this.data._id, this.data.addressId?._id).subscribe({
        next: (res) => {
          if (res.data.success == true) {
            this.dialogRef.close()
            this.snackBar.open('Job updated', 'Close', {
              duration: 5000,
              verticalPosition: 'top'
            })
          }
        }
      })
  }

}
