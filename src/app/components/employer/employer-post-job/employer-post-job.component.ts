import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { map } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { Country,State } from 'country-state-city';

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

  constructor(private breakpointObserver: BreakpointObserver,
    private locationService: LocationService) { }

  isSmallScreen = this.breakpointObserver.observe('(max-width: 600px)').pipe(
    map(result => result.matches)
  );

  ngOnInit(): void {
    this.countries = this.locationService.getCountries()
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
  


}
