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
      nombre: 'CUPRA LEON 1.5 eTSI 150CV',
      precio: 23500,
      ubicacion: 'Leganés',
      descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
      images: [
        'images/wgg2.1.png',
        'images/wgg2.0.png',
        'images/wgg2.3.png',
        'images/wgg2.2.png'
      ],
      user_id: 1,
      created_at: new Date('2011-09-25')
    },
  {
    id: 2,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    user_id: 1,
    created_at: new Date('2011-09-25')
  },
  
  {
    id: 3,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    user_id: 1,
    created_at: new Date('2011-09-25')
  },

  {
    id: 4,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    user_id: 1,
    created_at: new Date('2011-09-25')
  },

  {
    id: 5,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    user_id: 1,
    created_at: new Date('2011-09-25')
  },
  
  {
    id: 6,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    user_id: 1,
    created_at: new Date('2011-09-25')
  },
  {
    id: 7,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    user_id: 1,
    created_at: new Date('2011-09-25')
  },
  {
    id: 8,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    user_id: 1,
    created_at: new Date('2011-09-25')
  },

  {
    id: 9,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    user_id: 1,
    created_at: new Date('2011-09-25')
  },

  {
    id: 10,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    user_id: 1,
    created_at: new Date('2011-09-25')
  },

  {
    id: 11,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      'images/wgg2.1.png',
      'images/wgg2.0.png',
      'images/wgg2.3.png',
      'images/wgg2.2.png'
    ],
    user_id: 1,
    created_at: new Date('2011-09-25')
  }
  ];

  trackByProductId(index: number, product: any): number {
    return product.id;
  }
}
