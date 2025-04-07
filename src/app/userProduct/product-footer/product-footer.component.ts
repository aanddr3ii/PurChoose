import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../services/Product/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-footer.component.html',
  styleUrl: './product-footer.component.css',
})
export class ProductFooterComponent implements OnInit {
  product: Product | null = null; // Define un producto

  constructor(private productService: ProductService) {} // Inyecta el servicio

  ngOnInit(): void {
    // Suscríbete al Observable para obtener los productos
    this.productService.getProducts().subscribe({
      next: (products) => {
        if (products.length > 0) {
          this.product = products[0]; // Usa el primer producto (ajusta según sea necesario)
        }
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      },
    });
  }
}