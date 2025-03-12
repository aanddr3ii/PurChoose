import { Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ProductCategoryService } from '../../services/productCategory/product-category.service';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category'
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-description.component.html',
  styleUrl: './product-description.component.css'
})
export class ProductDescriptionComponent {
  products: Product[] = [];
  categories: Category[] = [];

  constructor(private productService: ProductService, private categoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts() ?? [];
    this.categories = this.categoryService.getCategories() ?? []; 
  }
}
