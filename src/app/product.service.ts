import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private database: AngularFireDatabase) {}

  create(product) {
    return this.database.list('/products').push(product);
  }
}
