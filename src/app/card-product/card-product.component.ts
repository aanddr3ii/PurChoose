import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-card-product',
  standalone: true,
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent {
  @Input() product!: Product;
  currentIndex: number = 0;

  // Acceso simplificado para usar en el template
  get imagenes() {
    return this.product?.imagenes || [];
  }

  nextSlide(): void {
    const maxIndex = this.imagenes.length;
    this.currentIndex = (this.currentIndex + 1) % maxIndex;
  }

  prevSlide(): void {
    const maxIndex = this.imagenes.length;
    this.currentIndex = (this.currentIndex - 1 + maxIndex) % maxIndex;
  }

  shortenDescription(description: string | undefined, limit: number = 23): string {
    if (!description) return '';
    return description.length > limit ? description.substring(0, limit) + '...' : description;
  }

  getAbsoluteImageUrl(image: { url: string }): string {
    if (!image || !image.url) {
      return '/assets/images/placeholder.jpg';
    }

    if (image.url.startsWith('/storage')) {
      return `http://localhost:8000${image.url}`;
    }

    return image.url;
  }
}