import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/Product/product.service';

@Component({
  selector: 'app-left-bar-products',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './left-bar-products.component.html',
  styleUrl: './left-bar-products.component.css'
})
export class LeftBarProductsComponent {
  products: any[] = []; // No strict typing, just print everything

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().forEach((product: Product) => {
      this.products.push(product);
    });
  }
}
