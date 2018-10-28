import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mountainData: object;
  profileData: object;

  constructor(public http: HttpClient, public authService: AuthService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {

    // put gaurd in here if cookie is expired;

    // maybe change this after I know where to get seasons data from
    this.http.post('https://ujj9l4tjj6.execute-api.us-east-1.amazonaws.com/prod/snowflakeData', {
      'cookie': this.authService.getCookie()
    }).toPromise().then((data: any) => {

      this.mountainData = JSON.parse(data.body)
    }).catch((error) => {
      console.log(error)
    })

    this.http.post('https://ujj9l4tjj6.execute-api.us-east-1.amazonaws.com/prod/skirideGetProfileData', {
      'cookie': this.authService.getCookie()
    }).toPromise().then((data: any) => {

      this.profileData = JSON.parse(data.body)['List'].filter((profile) => {
        return profile.IsUser
      });

      // save profile ID in database,

      this.profileData = this.profileData[0];
      // console.log(this.profileData)
    }).catch((error) => {
      console.log(error)
    })
  }

  logout() {
    this.authService.removeCookie();
  }


  // if not apart of pool
  // JOIN POOL
  // CREATE POOL

  // if apart of pools
  // /pools (list pools with option to join another one)
  // /create (create pool)

  // /pool/:pool_ID > SHOWS POOL RANKING IN POOL AND THEIR STATS (public endpoint)
  // SHARE POOL WITH PUBLIC URL?

  // contact (form)
}
