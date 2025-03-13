import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../services/Product/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-footer.component.html',
  styleUrl: './product-footer.component.css'
})
export class ProductFooterComponent {
  product: Product | null = null; // Define a product object

  constructor(private productService: ProductService) {} // Inject the service

  ngOnInit(): void {
    const products = this.productService.getProducts(); // Get products from service
    if (products.length > 0) {
      this.product = products[0]; // Use the first product (adjust logic as needed)
    }
  }
}
