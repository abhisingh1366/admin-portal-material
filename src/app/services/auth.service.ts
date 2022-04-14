import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  token : any;

  constructor() {
    this.checkUserLogged();
  }

  // login  to setuserdata to local
  // currenUser to get currently logged user
  // checkUserLogged to check if user already logged or not
  // isLogin to check if any user is logged or note

  loginSession(user: any) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.user = user;
  }

  currentUser() {
    return this.user
  }

  checkUserLogged() {
    let user = localStorage.getItem('userData');
    this.user = user ? JSON.parse(user) : null;
  }

  isLogin() {
    return this.user?.token ? true : false;
  }

  // forgetSession(token : any){
  //   // this.token = Response.body[0].token;
  //   localStorage.setItem('Token',JSON.stringify(token));//token stored in localstorage
  //   this.token = token;
  // }

}
