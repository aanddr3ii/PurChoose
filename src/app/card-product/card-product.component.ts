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

  /* La ubicacion exacta de cada imagen en el carousel */
  currentIndex: { [key: string]: number } = {};

  /* Para iniciarlo tal cual estan las imagenesen el ts a la hora de refrescarlo */
  constructor() {
    this.products.forEach(product => {
      this.currentIndex[product.title] = 0;
    });
  }

  /* Siguiente foto en la tarjeta del producto*/
  nextSlide(productTitle: string): void {
    const product = this.products.find(p => p.title === productTitle);
    if (product) {
      const maxIndex = product.images ? product.images.length - 1 : 0;
      this.currentIndex[product.title] = (this.currentIndex[product.title] + 1) % (maxIndex + 1);
    }
  }
  /* Volver a la foto anterior en la tarjeta del producto*/
  prevSlide(productTitle: string): void {
    const product = this.products.find(p => p.title === productTitle);
    if (product) {
      const maxIndex = product.images ? product.images.length - 1 : 0;
      this.currentIndex[product.title] = (this.currentIndex[product.title] - 1 + maxIndex + 1) % (maxIndex + 1);
    }
  }

  /* Para reducir la descripcion y no salga una enciclopedia :) */
  shortenDescription(description: string, limit: number = 50): string {
    return description.length > limit ? description.substring(0, limit) + '...' : description;
  }
}
