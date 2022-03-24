import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api: string = environment.config.api;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    var formData : any = new FormData();
    formData.append("email", username);
    formData.append("password", password);
    return this.http.post<any>(`${this.api}`, formData);
  }

}
