import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-triple-product-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './triple-product-display.component.html',
  styleUrls: ['./triple-product-display.component.css']
})
export class TripleProductDisplayComponent implements OnInit {
  title: string = 'Productos Destacados';
  description: string = 'Estos son productos increíbles que te pueden interesar.';
  products: Product[] = [
    {
      id: 1,
      src: 'https://cdn-icons-png.flaticon.com/512/5705/5705135.png',
    },
    {
      id: 2,
      src: 'https://cdn-icons-png.flaticon.com/512/5994/5994279.png',
    },
    {
      id: 3,
      src: 'https://cdn-icons-png.flaticon.com/512/1906/1906719.png',
    }
  ];

  ngOnInit(): void {
    console.log('Arreglo de productos:', this.products);
  }
}