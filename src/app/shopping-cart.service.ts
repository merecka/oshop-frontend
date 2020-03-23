import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private database: AngularFireDatabase) {}

  private create() {
    return this.database.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.database.object('/shopping-carts' + cartId);
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return this.getCart(result.key);
    }
    return this.getCart(cartId);
  }
}
