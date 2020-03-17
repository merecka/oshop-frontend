import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  categoriesObservable;

  constructor(
    categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categoriesObservable = categoryService.getCategories();
  }

  save(product) {
    this.productService.create(product);
  }
}
