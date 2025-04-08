import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para obtener el ID del producto de la URL
import { ProductDetailService } from '../../services/ProductDetail/product-detail.service';

@Component({
  selector: 'app-product-location',
  standalone: true,
  imports: [],
  templateUrl: './product-location.component.html',
  styleUrls: ['./product-location.component.css'],
})
export class ProductLocationComponent implements OnInit {
  location: string | null = null; // Ubicación del producto (null si no se carga)

  constructor(
    private route: ActivatedRoute, // Para obtener el ID del producto de la URL
    private productDetailService: ProductDetailService // Para obtener la ubicación del producto
  ) {}

  ngOnInit(): void {
    // Obtener el ID del producto de la URL
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (productId) {
      // Obtener la ubicación del producto usando el ProductDetailService
      this.productDetailService.getProductLocation(productId).subscribe({
        next: (location) => {
          this.location = location;
        },
        error: (error) => {
          console.error('Error al cargar la ubicación del producto:', error.message);
          this.location = 'Error al cargar la ubicación';
        },
      });
    }
  }
}