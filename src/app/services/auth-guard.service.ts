import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLogin()) {
      if (state.url == '/login') {
        this.router.navigate(['/dashboard']);
        return false
      }
      return true;
    }
    else {

      if (state.url == '/login') return true
      this.router.navigate(['/login']);
      return false;
    }
    // return true if you want to navigate, otherwise return false
  }


}
