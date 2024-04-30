import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
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
import { IEmployerRes } from 'src/app/models/employer';
import { IIndustry } from 'src/app/models/industry';
import { IndustryService } from 'src/app/services/industry.service';

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
  employer: IEmployerRes = {}
  employerId!: string | null
  isSubmitted: boolean = false
  form!: FormGroup
  employerDetails$ = this._store.pipe(select(selectEmployerDetails))
  companyName!: string | undefined
  industries: IIndustry[] = []

  constructor(@Inject(BreakpointObserver) private _breakpointObserver: BreakpointObserver,
    @Inject(LocationService) private _locationService: LocationService,
    @Inject(FormBuilder) private readonly _formBuilder: FormBuilder,
    @Inject(Store) private _store: Store,
    @Inject(AuthService) private _authService: AuthService,
    @Inject(EmployerService) private _employerService: EmployerService,
    @Inject(Router) private _router: Router,
    @Inject(JobService) private _jobService: JobService,
    @Inject(MatSnackBar) private _snackbar: MatSnackBar,
    @Inject(IndustryService) private _industryService: IndustryService) { }



  isSmallScreen = this._breakpointObserver.observe('(max-width: 600px)').pipe(
    map(result => result.matches)
  );

  ngOnInit(): void {
    this.employerId = this._authService.extractUserIdFromToken('employerToken')
    this.getEmployerDetails()
    this.getIndustries()
    this.form = this._formBuilder.group({
      jobTitle: ['', Validators.required],
      companyName: [{ value: this.companyName, disabled: true }, Validators.required],
      jobDescription: ['', Validators.required],
      email: ['', Validators.required],
      jobType: ['', Validators.required],
      salary: ['', Validators.required],
      specialisms: ['', Validators.required],
      experience: ['', Validators.required],
      gender: [''],
      industry: ['', Validators.required],
      applicationDeadline: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    })
    this.countries = this._locationService.getCountries()
  }

  getEmployerDetails(): void {
    if (this.employerId)
      this._employerService.getEmployerDetails(this.employerId).subscribe({
        next: (res) => {
          this.companyName = res.companyId?.companyName
          this.form.patchValue({
            companyName: this.companyName
          })
        }
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

  resetForm(): void {
    this.form.reset()
  }

  onSubmit(): void {
    if (this.employerId && this.form.valid) {
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
          if (this.employerId)
            this._employerService.getEmployerDetails(this.employerId).subscribe({
              next: (res) => {
                if (res.isSubscribed == false || (res.planExpiresAt && new Date(res.planExpiresAt) < new Date())) {
                  void this._router.navigate(['/employer/subscription'])
                } else {
                  if (this.employerId)
                    this._jobService.saveJob(data, this.employerId).subscribe({
                      next: (res) => {
                        if (res.data.success == true) {
                          this.resetForm()
                          void this._router.navigate(['/employer/manage-jobs'])
                          this._snackbar.open('Job Posted Successfully', 'Close', {
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
