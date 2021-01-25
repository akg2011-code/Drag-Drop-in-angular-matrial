import { plants } from './../interfaces/plants';
import { people } from './../interfaces/people';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThePeopleService {

  url:string="https://swapi.dev/api/people/"
  urlPlants:string="https://swapi.dev/api/planets/"
  allPeople:people[];
  allPlants:plants[];


  constructor(private http:HttpClient) { }

  //get all people data from object os 'results'
  getAllPeople(): Observable<people[]> {
    return this.http.get<people[]>(this.url)
      .pipe(map(data => {
        return data['results'];
      }));
  }

  //get all plants data from object os 'results' to take the name if plant from it
  getAllPlants(): Observable<plants[]> {
    return this.http.get<plants[]>(this.urlPlants)
      .pipe(map(res => {
        return res['results'];
      }));
  }



}
