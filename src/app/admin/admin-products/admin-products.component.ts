import { Subscription } from 'rxjs';
import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html'
})
export class AdminProductsComponent implements OnDestroy {
  productsObservable: Product[];
  filteredProducts: Product[];
  productsSubscription: Subscription;

  constructor(private productService: ProductService) {
    this.productsSubscription = this.productService
      .getProducts()
      .subscribe(
        products => (this.filteredProducts = this.productsObservable = products)
      );
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.productsObservable.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.productsObservable;
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
