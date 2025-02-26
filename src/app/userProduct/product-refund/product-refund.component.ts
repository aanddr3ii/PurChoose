import { Component } from '@angular/core';
import { CardProductComponent } from "../../card-product/card-product.component";

@Component({
  selector: 'app-product-refund',
  standalone: true,
  imports: [CardProductComponent],
  templateUrl: './product-refund.component.html',
  styleUrl: './product-refund.component.css'
})
export class ProductRefundComponent {
  isInfoVisible: boolean = false;

  toggleInfo(): void {
    this.isInfoVisible = !this.isInfoVisible;
  }
}
