import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  profile: any;

  constructor() { }

  // change this
  setProfile(profile: any) {
    this.profile = profile;
  }

  getProfile() {
    return this.profile;
  }


  setCookie(cookie) {
    localStorage.setItem('cookie', cookie);
  }

  getCookie() {
    return localStorage.getItem('cookie');
  }

  removeCookie() {
    localStorage.removeItem('cookie');
  }
}
