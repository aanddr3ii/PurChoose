import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-triple-product-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './triple-product-display.component.html',
  styleUrls: ['./triple-product-display.component.css']
})
export class TripleProductDisplayComponent {
  title: string = 'Productos Destacados';
  description: string = 'Estos son productos increíbles que te pueden interesar.';
  products: Product[] = [
    {
      id: 1,
      nombre: 'Luzes LED para plantas',
      descripcion: 'Luzes LED para plantas',
      precio: 0,
      estado: '',
      oferta: false,
      user_id: 1,
      ubicacion: 'Madrid', // Añadido para cumplir con la interfaz
      images: [
        { url: 'https://static.vecteezy.com/system/resources/thumbnails/045/943/907/small_2x/shiny-metal-wrench-on-transparent-background-png.png' }
      ]
    },
    {
      id: 2,
      nombre: 'PC Gaming',
      descripcion: 'PC Gaming',
      precio: 0,
      estado: '',
      oferta: false,
      user_id: 1,
      ubicacion: 'Madrid', // Añadido para cumplir con la interfaz
      images: [
        { url: 'https://www.pcspecialist.es/images/misc/right-pc.png' }
      ]
    },
    {
      id: 3,
      nombre: 'Coches de segunda mano',
      descripcion: 'Coches de segunda mano',
      precio: 0,
      estado: '',
      oferta: false,
      user_id: 1,
      ubicacion: 'Madrid',
      images: [
        { url: 'https://file.kelleybluebookimages.com/kbb/base/evox/CP/15275/2024-BMW-M3-front_15275_032_1852x744_X16_cropped.png' }
      ]
    }
  ];
}