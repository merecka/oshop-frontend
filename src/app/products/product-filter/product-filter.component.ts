import { Observable } from 'rxjs';
import { Category } from './../../models/category';
import { CategoryService } from './../../category.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  categoriesObservable: Observable<any>;
  @Input('category') category: Category;

  constructor(categoryService: CategoryService) {
    this.categoriesObservable = categoryService.getCategories();
  }
}
