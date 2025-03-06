import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-footer.component.html',
  styleUrl: './product-footer.component.css'
})
export class ProductFooterComponent {
  product: Product = {
    id: 1,
    src: '',
    price: 51.29,
    title: 'Botas de esqui marca Nordica',
    state: 'nuevo',
    location: '',
    description: 'botas de esqui marca Nordica tamaño de la suela 295 mm, talla 25-25,5en buen estado.'
  };
}
