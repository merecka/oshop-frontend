import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Category } from './models/category';
import { map } from 'rxjs/operators';
import { documentToDomainObject } from './../utils/firebase/firebaseUtils';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private database: AngularFireDatabase) {}

  getCategoriesObservable(): Observable<[Category]> {
    return this.database
      .list('/categories', query => query.orderByChild('name'))
      .snapshotChanges()
      .pipe(map(actions => actions.map(documentToDomainObject) as [Category]));
  }
}
