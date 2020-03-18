import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  categoriesObservable: Observable<any>;
  userObservable: Observable<any>;
  productSubscription: Subscription = null;
  productObservable: Observable<Product>;
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categoriesObservable = categoryService.getCategoriesObservable();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productObservable = productService.getProduct(this.id);
    } else {
      this.productObservable = of({}) as Observable<Product>;
    }
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }
}
