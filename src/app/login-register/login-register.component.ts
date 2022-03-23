import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent implements OnInit {
  submitted: boolean = false;
  loginForm: FormGroup;
  errorMessage: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiservice: ApiService
  ) {}

  ngOnInit(): void {
    sessionStorage.removeItem('loginDetails');
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.errorMessage = null;
    this.apiservice
      .login(this.f.username.value, this.f.password.value)
      .subscribe(
        (response: any) => {
          sessionStorage.setItem('loginDetails', JSON.stringify(response.data));
          if (response.data.id) {
            this.router.navigate(['/welcome']);
          } else {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
  }
}
