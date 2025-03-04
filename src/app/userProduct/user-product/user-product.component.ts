import { Component } from '@angular/core';
import { ProductFooterComponent } from '../product-footer/product-footer.component';

import { ProductDescriptionComponent } from '../product-description/product-description.component';
import { ProductDeliveryComponent } from '../product-delivery/product-delivery.component';
import { ProductRefundComponent } from '../product-refund/product-refund.component';
import { ProductUserBarComponent } from "../product-user-bar/product-user-bar.component";
import { ProductCarouselComponent } from "../product-carousel/product-carousel.component";
import { NavBeltComponent } from "../../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../../nav-categories/nav-categories.component";
import { ProductLocationComponent } from "../product-location/product-location.component";

@Component({
  selector: 'app-user-product',
  standalone: true,
  imports: [ProductFooterComponent, ProductDeliveryComponent, ProductRefundComponent, ProductDescriptionComponent, ProductUserBarComponent, ProductCarouselComponent, NavBeltComponent, NavCategoriesComponent, ProductLocationComponent],
  templateUrl: './user-product.component.html',
  styleUrl: './user-product.component.css'
})

export class UserProductComponent {

}
