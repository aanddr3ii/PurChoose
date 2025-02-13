
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
      description: "",
      title: ""
    },
    {
      id: 2,
      src: 'https://www.pcspecialist.es/images/misc/right-pc.png',
      price: 0,
      location: "",
      description: "",
      title: ""
    },
    {
      id: 3,
      src: 'https://file.aiquickdraw.com/imgcompressed/img/compressed_447e37f00d655ab667543fa7e7bd0401.webp',
      price: 0,
      location: "",
      description: "",
      title: ""
    }
  ];

  ngOnInit(): void {
    console.log('Arreglo de productos:', this.products);
  }
}



