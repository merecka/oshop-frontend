import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private userService: UserService,
    auth: AuthService,
    router: Router
  ) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');

        router.navigateByUrl(returnUrl);
      }
    });
  }
}
