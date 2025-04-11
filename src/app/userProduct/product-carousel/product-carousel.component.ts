import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/Product/product.service'; // Importa el servicio de productos
import { ActivatedRoute } from '@angular/router'; // Para obtener el ID de la ruta

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [],
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css'],
})
export class ProductCarouselComponent implements OnInit {
  images: string[] = []; // URLs de las imágenes
  currentIndex: number = 0; // Índice actual del carrusel

  constructor(
    private productService: ProductService, // Inyecta el servicio de productos
    private route: ActivatedRoute // Para obtener el ID de la ruta
  ) {}

  ngOnInit(): void {
    // Obtener el ID del producto de la ruta
    const productId = Number(this.route.snapshot.params['id']);
  
    if (!productId) {
      console.error('ID del producto no encontrado en la URL.');
      return;
    }
  
    // Obtener las imágenes del producto
    this.productService.getImagesByProductId(productId).subscribe({
      next: (urls) => {
        this.images = urls; // Asignar directamente el array de URLs
        this.currentIndex = 0;
      },
      error: (error) => {
        console.error('Error al cargar las imágenes:', error);
      },
    });
  }

  nextSlide(): void {
    if (this.currentIndex < this.images.length - 1) {
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