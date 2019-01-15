import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {

  loading: boolean = true;
  profile: any;
  columnsToDisplay: string[] = ['Name', 'BuyIn', 'VerticalFeet', 'DaysOnMountain', 'Lifts', 'MountainsVisited', 'Players'];
  dataSource = new MatTableDataSource();

  constructor(public http: HttpClient, public authService: AuthService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.profile = this.authService.getProfile();
    this.http.post('https://cdbiahura2.execute-api.us-west-1.amazonaws.com/prod/getPlayerPools', {
      ProfileId: this.profile.ProfileId
    }).toPromise().then((data: any) => {
      this.dataSource.data = data;
      this.loading = false;
    }).catch((error) => {
      console.log(error);
      this.loading = false;
    });
  }

  logout() {
    this.authService.removeCookie();
  }

  // check and update notification email / username if email

  // check notification if private prompt to update

  // update pools with vertical data on login and every day
}
