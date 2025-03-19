import { Component } from '@angular/core';
import { Product } from "../../interfaces/product";
import { CardProductComponent } from "../../card-product/card-product.component";
import { Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shopping-box',
  standalone: true,
  imports: [CardProductComponent, RouterLink],
  templateUrl: './shopping-box.component.html',
  styleUrl: './shopping-box.component.css'
})
export class ShoppingBoxComponent {
  @Input() product!: Product;
  products: Product[] = [
  {
    id: 1,
    title: 'VOLKSWAGEN GOLF GTI 2.0 230cv 2015',
    price: 18400,
    location: 'Leganés',
    description: 'FINANCIAMOS SOLO CON TU NÓMINA Y DNI ¡¡SIN ENTRADA!! POR TAN SOLO 240€ / MES',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    popularity: 2, // Popularidad (1-5)
    dateAdded: new Date('2004-10-01') // Fecha de publicación
  },
  {
    id: 2,
    title: 'CUPRA LEON 1.5 eTSI 150CV',
    price: 23500,
    location: 'Leganés',
    description: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    popularity: 4,
    dateAdded: new Date('2011-09-25')
  },
  
  {
    id: 3,
    title: 'CUPRA LEON 1.5 eTSI 150CV',
    price: 23500,
    location: 'Leganés',
    description: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    popularity: 4,
    dateAdded: new Date('2011-09-25')
  },

  {
    id: 4,
    title: 'CUPRA LEON 1.5 eTSI 150CV',
    price: 23500,
    location: 'Leganés',
    description: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    popularity: 4,
    dateAdded: new Date('2011-09-25')
  },

  {
    id: 5,
    title: 'CUPRA LEON 1.5 eTSI 150CV',
    price: 23500,
    location: 'Leganés',
    description: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    popularity: 4,
    dateAdded: new Date('2011-09-25')
  }

  ];

  trackByProductId(index: number, product: any): number {
    return product.id;
  }
}
