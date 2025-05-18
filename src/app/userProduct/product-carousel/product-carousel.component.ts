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
    const productId = this.route.snapshot.params['id']; // si el componente se carga por ruta
    this.productService.getImagesByProductId(productId).subscribe({
      next: (urls) => {
        this.images = urls;
      },
      error: (err) => {
        console.error('No se pudieron cargar imágenes:', err);
      }
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