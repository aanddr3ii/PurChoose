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
    },

    {
      title: 'CUPRA LEON 1.5 eTSI 150CV',
      price: 23500,
      location: 'Leganés',
      description: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
      images: [
        'https://cdn.wallapop.com/images/10420/i9/bt/__/c10420p1104058558/i5423511518.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i9/bt/__/c10420p1104058558/i5423511592.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i9/bt/__/c10420p1104058558/i5423511656.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i9/bt/__/c10420p1104058558/i5423511667.jpg?pictureSize=W640'
      ]
    },

    {
      title: 'Morgan 4/4 2006',
      price: 57000,
      location: 'Leganés',
      description: 'Impecable estado, interior, exterior y mecánica, se entrega totalmente al dia de mantenimiento',
      images: [
        'https://cdn.wallapop.com/images/10420/i8/a2/__/c10420p1102297545/i5414922662.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a2/__/c10420p1102297545/i5414922667.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a2/__/c10420p1102297545/i5414922671.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a2/__/c10420p1102297545/i5414922670.jpg?pictureSize=W640'
      ]
    },

    {
      title: 'Chevrolet GMC Apache 1959',
      price: 37500,
      location: 'Madrid',
      description: 'Impresionante gmc apache de 1959 totalmente restaurada.matricula historica,exenta de impuesto de circulacion,seguro 48€/al aÑo',
      images: [
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300343/i5414932761.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300343/i5414932771.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300343/i5414932768.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300343/i5414932765.jpg?pictureSize=W640'
      ]
    },

    {
      title: 'Volkswagen Escarabajo 1975',
      price: 18400,
      location: 'Madrid',
      description: 'TOTALMENTE RESTAURADO Y TERMINADO EN 2023, CARROCERIA, MOTOR, FRENOS',
      images: [
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300864/i5414934862.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300864/i5414934869.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300864/i5414934865.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i8/a4/__/c10420p1102300864/i5414934872.jpg?pictureSize=W640'
      ]
    },
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
