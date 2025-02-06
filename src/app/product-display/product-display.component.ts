import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent {
  title: string = 'Producto Destacado';
  description: string = 'Este es un producto increíble que te puede interesar.';

  // Producto con URL de imagen
 products: Product[] = [
    {
      id: 1,
      src: 'https://cdn-icons-png.flaticon.com/512/5705/5705135.png',
    },
    {
      id: 2,
      src: 'https://cdn-icons-png.flaticon.com/512/5994/5994279.png ',
    },
    {
      id: 3,
      src: 'https://cdn-icons-png.flaticon.com/512/1906/1906719.png',
    },

  ];
}
