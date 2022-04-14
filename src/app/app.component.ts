import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material-try';
  constructor(private router: Router,
    private authService: AuthService) {

  }

  logout() {
    localStorage.clear();
    this.authService.user = null;
    this.router.navigate(['/login'])
  }
}
