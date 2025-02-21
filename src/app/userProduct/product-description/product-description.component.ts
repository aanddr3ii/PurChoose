import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category'


@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [],
  templateUrl: './product-description.component.html',
  styleUrl: './product-description.component.css'
})
export class ProductDescriptionComponent {

  product: Product = {
    id: 1,
    src: '',
    price: 0,
    title: '',
    state: 'nuevo',
    location: '',
    description: 'botas de esqui marca Nordica tamaño de la suela 295 mm, talla 25-25,5en buen estado.'
  };

  category: Category = {
    id: 1,
    text: 'Deportes y Fitness'
  };
  
}
