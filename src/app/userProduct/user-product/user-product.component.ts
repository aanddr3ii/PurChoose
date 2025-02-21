import { Component } from '@angular/core';
import { ProductFooterComponent } from '../product-footer/product-footer.component';

import { ProductDescriptionComponent } from '../product-description/product-description.component';
import { ProductDeliveryComponent } from '../product-delivery/product-delivery.component';
import { ProductRefundComponent } from '../product-refund/product-refund.component';

@Component({
  selector: 'app-user-product',
  standalone: true,
  imports: [ProductFooterComponent, ProductDeliveryComponent, ProductRefundComponent, ProductDescriptionComponent],
  templateUrl: './user-product.component.html',
  styleUrl: './user-product.component.css'
})
export class UserProductComponent {

}
