import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { map } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { Country, State } from 'country-state-city';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from 'src/app/services/job.service';
import { Store, select } from '@ngrx/store';
import { selectEmployerDetails } from 'src/app/states/employer/employer.selector';
import { AuthService } from 'src/app/services/auth.service';
import { EmployerService } from 'src/app/services/employer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IJobRes } from 'src/app/models/job';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  form!: FormGroup
  employerDetails$ = this.store.pipe(select(selectEmployerDetails))


  constructor(private breakpointObserver: BreakpointObserver,
    private locationService: LocationService,
    private readonly formBuilder: FormBuilder,
    private store: Store,
    private authService: AuthService,
    private employerService: EmployerService,
    private router: Router,
    private jobService: JobService,
    private snackbar: MatSnackBar) { }
  


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
    const stateCode = this.getStateCode(countryCode, stateName);
    if (stateCode) {
      this.cities = this.locationService.getCities(countryCode, stateCode);
    }
  }

  resetForm():void {
    this.form.reset()
  }

  onSubmit(): void {
    const employerId = this.authService.extractUserIdFromToken('employerToken')
    if (employerId && this.form.valid) {
      void Swal.fire({
        title: 'Do you want to Post this Job ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Post Job',
        cancelButtonText: 'No, Cancel'
      }).then(result => {
        if (result.isConfirmed) {
          const data: IJobRes = this.form.getRawValue()
          const dataAsString: string = JSON.stringify(data);
          localStorage.setItem('postJobDetails', dataAsString)
          this.employerService.getEmployerDetails(employerId).subscribe({
            next: (res) => {
              if (res.isSubscribed == false || (res.planExpiresAt && new Date(res.planExpiresAt) < new Date())) {
                void this.router.navigate(['/employer/subscription'])
              } else {
                this.jobService.saveJob(data).subscribe({
                  next: (res) => {
                    if (res.data.success == true) {
                      this.resetForm()
                      this.snackbar.open('Job Posted Successfully', 'Close', {
                        duration: 5000,
                        verticalPosition: 'top',
                      })
                    }
                  }
                })
              }
            }
          })
        }
      })
    }

  }






}
