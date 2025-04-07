import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/Product/product.service';

@Component({
  selector: 'app-left-bar-products',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './left-bar-products.component.html',
  styleUrls: ['./left-bar-products.component.css'],
})
export class LeftBarProductsComponent implements OnInit {
  products: Product[] = []; // Array para almacenar los productos

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Suscribirse al Observable para obtener los productos
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data; // Asignar los productos obtenidos
      },
      error: (error: any) => {
        console.error('Error al cargar los productos:', error);
      },
    });
  }
}