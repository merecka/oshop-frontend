import { User } from './../models/user';
import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html'
})
export class BsNavbarComponent implements OnDestroy {
  userSubscription: Subscription = null;
  User: User;
  constructor(private authService: AuthService) {
    this.userSubscription = authService.User$.subscribe(
      user => (this.User = user)
    );
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
