import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  //método para generar un país nuevo basado en la info del request http
  createCountry(request: Country): Observable<any> {

    let endpoint = 'countries'
    return this.http.post(environment.country + endpoint, request);

  }
  //método para obtener todos los países cargados en la Api
  listCountries(): Observable<any> {
    let endpoint = 'countries'
    return this.http.get(environment.country + endpoint);
    
    //return this.http.get<Array<Country>>(environment.country + endpoint);
    //opcion si el metodo devuelve <Array<Country>>
  }
}
