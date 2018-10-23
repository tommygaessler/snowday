import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading: boolean = false;
  response: object = {};
  mountainData: object = {};
  loginForm: FormGroup;

  constructor(fb: FormBuilder, public http: HttpClient) {
    this.loginForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  ngOnInit() {

  }

  login() {
    this.mountainData = {};
    this.loading = true;
    this.http.post('https://ujj9l4tjj6.execute-api.us-east-1.amazonaws.com/prod/snowflakeLogin', {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      remember: false
    }).toPromise().then((data: any) => {
      this.response = JSON.parse(data.body)['response'];
      if(this.response['session_cookie']) {
        this.getData(this.response['session_cookie']);
      } else {
        this.loading = false;
      }
    }).catch((error) => {
      this.loading = false;
      this.response['status'] = 'Server Error, Contact 303-565-0001';
      console.log(error)
    })
  }

  getData(cookie) {
    this.http.post('https://ujj9l4tjj6.execute-api.us-east-1.amazonaws.com/prod/snowflakeData', {
      'cookie': cookie
    }).toPromise().then((data: any) => {
      this.mountainData = JSON.parse(data.body);
      this.loading = false;
    }).catch((error) => {
      this.loading = false;
      this.response['status'] = 'Server Error, Contact 303-565-0001';
      console.log(error)
    })
  }
}
