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
  error: string;
  mountainData: object = {};
  loginForm: FormGroup;

  constructor(fb: FormBuilder, public http: HttpClient, public router: Router, public authService: AuthService) {
    this.loginForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  login() {
    this.error = null;
    this.loading = true;
    this.http.post('https://cdbiahura2.execute-api.us-west-1.amazonaws.com/prod/login', {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      remember: false
    }).toPromise().then((data: any) => {
      if(data.statusCode === 200) {
        this.authService.setProfile(data.body);
        this.router.navigate(['/dashboard']);
      } else {
        this.loading = false;
        this.error = data.body.reason;
      }
    }).catch((error) => {
      this.loading = false;
      this.error = 'Server Error, Contact 303-565-0001';
      console.log(error)
    })
  }
}
