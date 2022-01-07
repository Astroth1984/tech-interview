import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { observable, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private REST_API_URL = 'https://api.publicapis.org/entries';

  constructor(private httpClient: HttpClient) { }

  fetchData() {
    return this.httpClient.get(this.REST_API_URL);
  }
}
