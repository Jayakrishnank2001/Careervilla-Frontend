import { Injectable } from '@angular/core';
import { Country,State,City } from 'country-state-city';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  getCountries(): string[] {
    const countries = Country.getAllCountries();
    return countries.map((country) => country.name);
  }

  getStates(countryCode: string): string[]{
    const states = State.getStatesOfCountry(countryCode)
    console.log(countryCode)
    return states.map((state)=>state.name)
  }

  getCities(countryCode: string, stateCode: string): string[]{
    const cities = City.getCitiesOfState(countryCode, stateCode)
    return cities.map((city)=>city.name)
  }



}
