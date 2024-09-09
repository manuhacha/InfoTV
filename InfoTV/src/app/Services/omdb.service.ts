import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class OMDBService {

  private apiURL = ''

  constructor(private http: HttpClient) { }

  search(api:string,filmname:string) {

    this.apiURL = 'http://www.omdbapi.com/?apikey=' + api + '&' + 't=' + filmname
    return this.http.get<any>(this.apiURL)
  }
}
