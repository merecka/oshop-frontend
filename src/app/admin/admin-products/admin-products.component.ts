import { ProductService } from './../../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html'
})
export class AdminProductsComponent {
  productsObservable;

  constructor(private productService: ProductService) {
    this.productsObservable = this.productService.getProductsObservable();
  }
}
