import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  categoriesObservable;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categoriesObservable = categoryService.getCategories();
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
