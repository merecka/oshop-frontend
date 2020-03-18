import { User } from './models/user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private database: AngularFireDatabase) {}

  save(user: firebase.User): void {
    this.database.object('users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): AngularFireObject<User> {
    return this.database.object('/users/' + uid);
  }
}
