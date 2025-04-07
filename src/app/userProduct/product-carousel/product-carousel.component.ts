import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/Product/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.css',
})
export class ProductCarouselComponent implements OnInit {
  product: Product | null = null;
  images: string[] = [];
  currentIndex: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Suscribirse al Observable para obtener los productos
    this.productService.getProducts().subscribe({
      next: (products) => {
        if (products.length > 0) {
          this.product = products[0]; // Asignar el primer producto
          this.images = this.product?.images ?? []; // Inicializar las imágenes
        }
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      },
    });
  }

  nextSlide(): void {
    if (this.product && this.images && this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToImage(index: number): void {
    if (index >= 0 && index < this.images.length) {
      this.currentIndex = index;
    }
  }
}