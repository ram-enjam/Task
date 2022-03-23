import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  api: string = environment.config.api;
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('loginDetails') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): any {
    return (
      this.currentUserSubject.value ||
      JSON.parse(sessionStorage.getItem('loginDetails') || '{}')
    );
  }

  login(username: string, password: string) {
    var formData : any = new FormData();
    formData.append("email", username);
    formData.append("password", password);
    return this.http.post<any>(`${this.api}`, formData);
  }

  logout() {
    sessionStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
