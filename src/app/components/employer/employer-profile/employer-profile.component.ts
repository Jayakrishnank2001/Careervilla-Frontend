import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IEmployerRes } from 'src/app/models/employer';
import { AuthService } from 'src/app/services/auth.service';
import { EmployerService } from 'src/app/services/employer.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { Country,State } from 'country-state-city';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>

  userData: IEmployerRes = {}
  form!: FormGroup
  countries: string[] = []
  states: string[] = []
  cities: string[] = []
  selectedCountry!: string;
  isSubmitted: boolean = false

  constructor(private authService: AuthService,
    private employerService: EmployerService,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private locationService: LocationService) { }

  ngOnInit(): void {
    this.employerProfile()
    this.countries = this.locationService.getCountries()
    this.form = this.fb.group({
      companyName: ['', Validators.required],
      website: ['', Validators.required],
      companySize: ['', Validators.required],
      industry: ['', Validators.required],
      email: ['', Validators.required],
      foundedYear: ['', Validators.required],
      companyDescription: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city:['',Validators.required]
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

  employerProfile(): void {
    const employerId = this.authService.extractUserIdFromToken('employerToken')
    if (employerId)
      this.employerService.getEmployerDetails(employerId).subscribe({
        next: (res) => {
          console.log(res)
          this.userData = res
        }
      })
  }

  openFileInput(fileInput: any): void{
    fileInput.click()
  }

  onFileSelected(event: any): void{
    const file = event.target.files[0];
    const filePath = `Employer/profile-photo/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          const employerId = this.authService.extractUserIdFromToken('employerToken')
          if (employerId) {
            this.employerService.updatePhoto(employerId, url).subscribe({
              next: (res) => {
                if (res.data.success == true) {
                  this.employerProfile()
                  this.snackBar.open('Profile photo updated successfully', 'Close', {
                    duration: 5000,
                    verticalPosition: 'top',
                  })
                }
              }
            })
          }

        });
      })
    ).subscribe();
  }


  onSubmit(): void{
    
  }

}
