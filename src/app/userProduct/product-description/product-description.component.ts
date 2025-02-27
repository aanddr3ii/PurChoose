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
    src: 'https://cdn.wallapop.com/images/10420/ia/qw/__/c10420p1106442857/i5437885982.jpg?pictureSize=W640',
    price: 196,
    title: 'Botas esqui tecnica',
    state: 'Nuevo',
    location: 'Madrid',
    description: 'botas de esqui marca Nordica tamaño de la suela 295 mm, talla 25-25,5en buen estado.'
  };

  category: Category = {
    id: 1,
    text: 'Deportes y Fitness'
  };
  
}
