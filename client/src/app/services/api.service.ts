import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {

  baseUrl: string = environment.baseUrl;
  url: string = this.baseUrl + 'api';

  constructor(public http: Http) {
  }

  get(endpoint: string) {
    return this.http.get(this.url + endpoint);
  }

  post(endpoint: string, body: any) {
    return this.http.post(this.url + endpoint, body);
  }

}
