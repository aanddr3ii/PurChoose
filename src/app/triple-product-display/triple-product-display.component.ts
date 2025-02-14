
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
      src: 'https://www.atophort.com/files/products/hl17/Multi-Bars-Grow-Lights-2.png',
      price: 0,
      location: "",
      description: "Luzes LED para plantas",
      title: ""
    },
    {
      id: 2,
      src: 'https://www.pcspecialist.es/images/misc/right-pc.png',
      price: 0,
      location: "",
      description: "PC Gaming",
      title: ""
    },
    {
      id: 3,
      src: 'https://cdn.pixabay.com/photo/2015/10/01/19/05/car-967470_640.png',
      price: 0,
      location: "",
      description: "Coches casi nuevos",
      title: ""
    }
  ];

  ngOnInit(): void {
    console.log('Arreglo de productos:', this.products);
  }
}



