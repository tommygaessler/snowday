import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface PeriodicElement {
  ranking: number
  name: string;
  pool: number;
  players: number;
  data: string;
}

const ELEMENT_DATA: PeriodicElement[] = []

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

  profile: any;
  columnsToDisplay: string[] = ['ranking', 'name', 'pool', 'players'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  constructor(public http: HttpClient, public authService: AuthService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getData();
  }

  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
  }

  getData() {
    if(this.authService.getProfile()) {
      this.profile = this.authService.getProfile();
    } else {
      this.router.navigate(['/']);
    }
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
