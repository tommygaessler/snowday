import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
