import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private _apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {

    const url =  `${ this._apiUrl }/alpha/${ code }`

    return this.http.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0]: null ),
      catchError( () => of(null))
    );

  }

  searchCapital( term: string ): Observable<Country[]> {

    return this.http.get<Country[]>( `${ this._apiUrl }/capital/${ term }` )
    .pipe(
      catchError( () => of([]) )
    );

  }

  searchCountry( term: string ): Observable<Country[]> {
    return this.http.get<Country[]>( `${this._apiUrl}/name/${term}` )
    .pipe(
      catchError( () => of([]))
    );
  }

  searchRegion( region: string ): Observable<Country[]> {
    return this.http.get<Country[]>( `${this._apiUrl}/region/${region}` )
    .pipe(
      catchError( () => of([]))
    );
  }

}
