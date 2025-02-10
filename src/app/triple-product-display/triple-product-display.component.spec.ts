import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product'; // Asegúrate de que la ruta sea correcta

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

  // Tres productos con URLs de imagen
  products: Product[] = [
    {
      id: 1,
      src: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      src: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      src: 'https://via.placeholder.com/300x200',
    }
  ];
}