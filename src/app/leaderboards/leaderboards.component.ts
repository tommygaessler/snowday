import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

export interface Pool {
  rank: number
  name: string
  pool: number
  vertical: number
  days: number
  lifts: number
  mountains: number
  players: number
}

const POOL_DATA: Pool[] = [
  {
    rank: 1,
    name: 'Apostrophe',
    pool: 1000,
    vertical: 1000,
    days: 12,
    lifts: 30,
    mountains: 3,
    players: 100
  }
];

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit {

  rankedBy: string = 'VerticalFeet';

  playerDisplayedColumns: string[] = ['rank', 'Name', 'VerticalFeet', 'DaysOnMountain', 'Lifts', 'MountainsVisited', 'Pools'];
  playerDataSource = new MatTableDataSource();

  poolDisplayedColumns: string[] = ['rank', 'name', 'pool', 'vertical', 'days', 'lifts', 'mountains', 'players'];
  poolDataSource = new MatTableDataSource(POOL_DATA);

  @ViewChild(MatSort) sort: MatSort;

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.poolDataSource.sort = this.sort;
    this.playerDataSource.sort = this.sort;

    this.getPlayers()
  }

  getPlayers() {
    this.http.get('https://cdbiahura2.execute-api.us-west-1.amazonaws.com/prod/getPlayers').toPromise().then((data: any) => {
      this.playerDataSource.data = data;
    }).catch((error) => {
      console.log(error)
    })
  }

  rankChange() {
    setTimeout(() => this.playerDataSource.sort = this.sort );
  }

}
