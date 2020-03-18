import { documentToDomainObject } from './../utils/firebase/firebaseUtils';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from './models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private database: AngularFireDatabase) {}

  create(product) {
    return this.database.list('/products').push(product);
  }

  getProductsObservable(): Observable<[Product]> {
    return this.database
      .list('/products')
      .snapshotChanges()
      .pipe(map(products => products.map(documentToDomainObject) as [Product]));
  }

  getProduct(productId): Observable<Product> {
    return this.database
      .object('/products/' + productId)
      .valueChanges()
      .pipe(take(1)) as Observable<Product>;
  }

  update(productId, product): void {
    this.database.object('/products/' + productId).update(product);
  }
}
