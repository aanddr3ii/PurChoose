import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent {
  products = [
    {
      title: 'VOLKSWAGEN GOLF GTI 2.0 230cv 2015',
      price: 18400,
      location: 'Leganés',
      description: 'FINANCIAMOS SOLO CON TU NÓMINA Y DNI ¡¡SIN ENTRADA!! POR TAN SOLO 240€ / MES',
      images: [
        'images/wgg2.1.png',
        'images/wgg2.0.png',
        'images/wgg2.3.png',
        'images/wgg2.2.png'
      ]
    }
  ];

  currentIndex: { [key: string]: number } = {};

  constructor() {
    // Initialize the currentIndex object correctly for each product
    this.products.forEach(product => {
      this.currentIndex[product.title] = 0;
    });
  }

  nextSlide(productTitle: string): void {
    const product = this.products.find(p => p.title === productTitle);
    if (product) {
      const maxIndex = product.images ? product.images.length - 1 : 0;
      this.currentIndex[product.title] = (this.currentIndex[product.title] + 1) % (maxIndex + 1);
    }
  }

  prevSlide(productTitle: string): void {
    const product = this.products.find(p => p.title === productTitle);
    if (product) {
      const maxIndex = product.images ? product.images.length - 1 : 0;
      this.currentIndex[product.title] = (this.currentIndex[product.title] - 1 + maxIndex + 1) % (maxIndex + 1);
    }
  }

  shortenDescription(description: string, limit: number = 50): string {
    return description.length > limit ? description.substring(0, limit) + '...' : description;
  }
}
