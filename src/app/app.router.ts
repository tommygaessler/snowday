import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JoinComponent } from './join/join.component';
import { CreateComponent } from './create/create.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'leaderboards', component: LeaderboardsComponent },
  { path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuardService] },
  { path: 'create', component: CreateComponent,
    canActivate: [AuthGuardService] },
  { path: 'join', component: JoinComponent,
    canActivate: [AuthGuardService] },
  { path: 'logout', component: LogoutComponent,
    canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '' }
];
