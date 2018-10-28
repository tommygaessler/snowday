import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) { }

  canActivate() {
    if(localStorage.getItem('cookie')) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
