import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { map } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { Country,State } from 'country-state-city';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-employer-post-job',
  templateUrl: './employer-post-job.component.html',
  styleUrls: ['./employer-post-job.component.css']
})
export class EmployerPostJobComponent implements OnInit {

  countries: string[] = []
  states: string[] = []
  cities: string[] = []
  selectedCountry!: string;

  isSubmitted: boolean = false
  form!:FormGroup

  constructor(private breakpointObserver: BreakpointObserver,
    private locationService: LocationService,
    private readonly formBuilder: FormBuilder,
  private jobService:JobService) { }
  

  isSmallScreen = this.breakpointObserver.observe('(max-width: 600px)').pipe(
    map(result => result.matches)
  );

  ngOnInit(): void {
    this.countries = this.locationService.getCountries()
    this.form = this.formBuilder.group({
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      jobDescription: ['', Validators.required],
      email: ['', Validators.required],
      jobType: ['', Validators.required],
      salary: ['', Validators.required],
      specialisms: ['', Validators.required],
      experience: ['', Validators.required],
      gender: ['', Validators.required],
      industry: ['', Validators.required],
      applicationDeadline: ['', Validators.required],
      address: ['', Validators.required],
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
      this.states = this.locationService.getStates(countryCode);
    }
  }

  onStateChange(countryCode: string, event: MatSelectChange): void {
    const stateName = event.value;
    console.log(stateName)
    const stateCode = this.getStateCode(countryCode, stateName);
    console.log(stateCode)
    if (stateCode) {
      this.cities = this.locationService.getCities(countryCode, stateCode);
    }
  }

  onSubmit():void {
    this.isSubmitted = true
    if (this.form.valid) {
      const data = this.form.getRawValue()
      this.jobService.saveJob(data).subscribe({
        
      })
    }
  }
  


}
