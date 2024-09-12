import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OMDBService {

  constructor(private http: HttpClient) { }

  search(api:string,filmname: string): Observable<any> {
    return this.http.get<any>('http://www.omdbapi.com/?apikey=' + api + '&' + 't=' + filmname);
  }
}
