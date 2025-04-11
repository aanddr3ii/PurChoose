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
        { url: 'images/wgg2.1.png' },
        { url: 'images/wgg2.0.png' },
        { url: 'images/wgg2.3.png' },
        { url: 'images/wgg2.2.png' }
      ],
      user_id: 1,
      estado: 'nuevo',
      oferta: false,
        },
  {
    id: 2,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      { url: 'images/wgg2.1.png' },
      { url: 'images/wgg2.0.png' },
      { url: 'images/wgg2.3.png' },
      { url: 'images/wgg2.2.png' }
    ],
    user_id: 1,
    estado: 'nuevo',
    oferta: false,
    },
  
  {
    id: 3,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      { url: 'images/wgg2.1.png' },
      { url: 'images/wgg2.0.png' },
      { url: 'images/wgg2.3.png' },
      { url: 'images/wgg2.2.png' }
    ],
    user_id: 1,
    estado: 'nuevo',
    oferta: false,
    },

  {
    id: 4,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      { url: 'images/wgg2.1.png' },
      { url: 'images/wgg2.0.png' },
      { url: 'images/wgg2.3.png' },
      { url: 'images/wgg2.2.png' }
    ],
    user_id: 1,
    estado: 'nuevo',
    oferta: false,
    },

  {
    id: 5,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      { url: 'images/wgg2.1.png' },
      { url: 'images/wgg2.0.png' },
      { url: 'images/wgg2.3.png' },
      { url: 'images/wgg2.2.png' }
    ],
    user_id: 1,
    estado: 'nuevo',
    oferta: false,
    },
  
  {
    id: 6,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      { url: 'images/wgg2.1.png' },
      { url: 'images/wgg2.0.png' },
      { url: 'images/wgg2.3.png' },
      { url: 'images/wgg2.2.png' }
    ],
    user_id: 1,
    estado: 'nuevo',
    oferta: false,
    },
  {
    id: 7,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      { url: 'images/wgg2.1.png' },
      { url: 'images/wgg2.0.png' },
      { url: 'images/wgg2.3.png' },
      { url: 'images/wgg2.2.png' }
    ],
    user_id: 1,
    estado: 'nuevo',
    oferta: false,
    },
  {
    id: 8,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      { url: 'images/wgg2.1.png' },
      { url: 'images/wgg2.0.png' },
      { url: 'images/wgg2.3.png' },
      { url: 'images/wgg2.2.png' }
    ],
    user_id: 1,
    estado: 'nuevo',
    oferta: false,
    },

  {
    id: 9,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      { url: 'images/wgg2.1.png' },
      { url: 'images/wgg2.0.png' },
      { url: 'images/wgg2.3.png' },
      { url: 'images/wgg2.2.png' }
    ],
    user_id: 1,
    estado: 'nuevo',
    oferta: false,
    },

  {
    id: 10,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      { url: 'images/wgg2.1.png' },
      { url: 'images/wgg2.0.png' },
      { url: 'images/wgg2.3.png' },
      { url: 'images/wgg2.2.png' }
    ],
    user_id: 1,
    estado: 'nuevo',
    oferta: false,
  },

  {
    id: 11,
    nombre: 'CUPRA LEON 1.5 eTSI 150CV',
    precio: 23500,
    ubicacion: 'Leganés',
    descripcion: 'Coche de noviembre 2022 en perfecto estado, duerme en garaje, 19.000km',
    images: [
      { url: 'images/wgg2.1.png' },
      { url: 'images/wgg2.0.png' },
      { url: 'images/wgg2.3.png' },
      { url: 'images/wgg2.2.png' }
    ],
    user_id: 1,
    estado: 'nuevo',
    oferta: false,  
  }
  ];

  trackByProductId(index: number, product: any): number {
    return product.id;
  }
}
