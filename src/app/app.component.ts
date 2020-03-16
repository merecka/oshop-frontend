import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  private userSubscription: Subscription = null;
  constructor(
    private userService: UserService,
    authService: AuthService,
    router: Router
  ) {
    this.userSubscription = authService.userObservable.subscribe(user => {
      if (user) {
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');

        router.navigateByUrl(returnUrl);
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
