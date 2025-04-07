import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/Product/product.service';
import { ProductCategoryService } from '../../services/productCategory/product-category.service';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css'],
})
export class ProductDescriptionComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {
    // Suscribirse al Observable para obtener los productos
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data; // Asignar los productos obtenidos
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      },
    });

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}