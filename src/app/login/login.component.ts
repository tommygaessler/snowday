import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  response: object = {};
  mountainData: object = {};
  loginForm: FormGroup;

  constructor(fb: FormBuilder, public http: HttpClient, public router: Router, public authService: AuthService) {
    this.loginForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  ngOnInit() {

  }

  login() {
    this.loading = true;
    this.http.post('https://ujj9l4tjj6.execute-api.us-east-1.amazonaws.com/prod/snowflakeLogin', {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      remember: false
    }).toPromise().then((data: any) => {
      this.response = JSON.parse(data.body)['response'];
      if(this.response['session_cookie']) {

        this.authService.setCookie(this.response['session_cookie']);

        this.router.navigate(['/dashboard']);
      } else {
        this.loading = false;
      }
    }).catch((error) => {
      this.loading = false;
      this.response['status'] = 'Server Error, Contact 303-565-0001';
      console.log(error)
    })
  }
}
