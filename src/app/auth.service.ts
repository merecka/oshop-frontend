import { UserService } from './user.service';
import { User } from './models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userObservable: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private angularFireAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    this.userObservable = angularFireAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.angularFireAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }

  get User$(): Observable<User> {
    return this.userObservable.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
}
