import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.userObservable
      .pipe(switchMap(user => this.userService.get(user.uid).valueChanges()))
      .pipe(map(appUser => appUser.isAdmin));
  }
}
