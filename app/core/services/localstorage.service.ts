import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LocalstorageService {

  localStorge =  window.localStorage;
  sessionStorge =  window.sessionStorage;
  constructor() { }

  getLocalStorage(key:  string) {
    return this.localStorge.getItem(key);
  }

  setLocalStorage(key:  string,  value:  string) {
    this.localStorge.setItem(key,  value);
  }

  checkLocalStorage(key:  string):  boolean {
    if  (this.getLocalStorage(key)) {
      return true;
    } else {
    return false;
    }

  }


  getSessionStorage(key:  string) {
    return this.sessionStorge.getItem(key);
  }

  setSessionStorage(key:  string,  value:  string) {
    this.sessionStorge.setItem(key,  value);

  }

  removeSessionStorage(key:  string) {
    this.sessionStorge.removeItem(key);
  }

  checkSessionStorage(key:  string):  boolean {
    if  (this.getSessionStorage(key)) {
      return true;
    } else {
    return false;
    }
  }

  clear() {
    this.localStorge.clear();
  }
  clearLocalStorage(key: string) {
    this.localStorge.removeItem(key);
  }
}
