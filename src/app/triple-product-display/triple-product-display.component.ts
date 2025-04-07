
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product';

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
      nombre: 'Luzes LED para plantas', // Cambiado de `title` a `nombre`
      descripcion: 'Luzes LED para plantas', // Mantenido igual
      precio: 0, // Cambiado de `price` a `precio`
      estado: '', // Mantenido igual
      oferta: false, // Añadido (requerido por la interfaz)
      user_id: 1, // Añadido (requerido por la interfaz)
      images: ['https://static.vecteezy.com/system/resources/thumbnails/045/943/907/small_2x/shiny-metal-wrench-on-transparent-background-png.png'] // Cambiado de `src` a `images`
    },
    {
      id: 2,
      nombre: 'PC Gaming', // Cambiado de `title` a `nombre`
      descripcion: 'PC Gaming', // Mantenido igual
      precio: 0, // Cambiado de `price` a `precio`
      estado: '', // Mantenido igual
      oferta: false, // Añadido (requerido por la interfaz)
      user_id: 1, // Añadido (requerido por la interfaz)
      images: ['https://www.pcspecialist.es/images/misc/right-pc.png'] // Cambiado de `src` a `images`
    },
    {
      id: 3,
      nombre: 'Coches de segunda mano', // Cambiado de `title` a `nombre`
      descripcion: 'Coches de segunda mano', // Mantenido igual
      precio: 0, // Cambiado de `price` a `precio`
      estado: '', // Mantenido igual
      oferta: false, // Añadido (requerido por la interfaz)
      user_id: 1, // Añadido (requerido por la interfaz)
      images: ['https://file.kelleybluebookimages.com/kbb/base/evox/CP/15275/2024-BMW-M3-front_15275_032_1852x744_X16_cropped.png'] // Cambiado de `src` a `images`
    }
  ];
}