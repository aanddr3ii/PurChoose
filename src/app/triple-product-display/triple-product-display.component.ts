
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
      src: 'https://static.vecteezy.com/system/resources/thumbnails/045/943/907/small_2x/shiny-metal-wrench-on-transparent-background-png.png',
      price: 0,
      location: "",
      description: "Luzes LED para plantas",
      title: "",
      state: ''
    },
    {
      id: 2,
      src: 'https://www.pcspecialist.es/images/misc/right-pc.png',
      price: 0,
      location: "",
      description: "PC Gaming",
      title: "",
      state: ''
    },
    {
      id: 3,
      src: 'https://file.kelleybluebookimages.com/kbb/base/evox/CP/15275/2024-BMW-M3-front_15275_032_1852x744_X16_cropped.png',
      price: 0,
      location: "",
      description: "Coches de segunda mano",
      title: "",
      state: ''
    }
  ];

}



