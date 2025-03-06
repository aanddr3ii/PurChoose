import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-card-product',
  standalone: true,
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent {
  @Input() product!: Product; // Recibimos un producto individual como entrada
  currentIndex: number = 0; // Índice actual del carrusel

  /* Siguiente foto en el carrusel */
  nextSlide(): void {
    const maxIndex = this.product.images?.length || 0;
    this.currentIndex = (this.currentIndex + 1) % maxIndex;
  }

  /* Foto anterior en el carrusel */
  prevSlide(): void {
    const maxIndex = this.product.images?.length || 0;
    this.currentIndex = (this.currentIndex - 1 + maxIndex) % maxIndex;
  }

  /* Acortar descripción */
  shortenDescription(description: string | undefined, limit: number = 50): string {
    if (!description) return ''; // Si no hay descripción, devolvemos una cadena vacía
    return description.length > limit ? description.substring(0, limit) + '...' : description;
  }
}