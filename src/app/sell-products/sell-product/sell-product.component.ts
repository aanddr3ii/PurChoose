import { Component } from '@angular/core';
import { ProductTitleComponent } from "../product-title/product-title.component";
import { SellProductCategoryComponent } from '../sell-product-category/sell-product-category.component';
import { ProductDescriptionComponent } from "../product-description/product-description.component";
import { ProductPriceComponent } from "../product-price/product-price.component";
import { SellProductConditionComponent } from '../sell-product-condition/sell-product-condition.component';
import { ProductPhotoComponent } from "../product-photo/product-photo.component";
import { NavBeltComponent } from "../../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../../nav-categories/nav-categories.component";

@Component({
  selector: 'app-sell-product',
  standalone: true,
  imports: [ProductTitleComponent, SellProductCategoryComponent, ProductDescriptionComponent, ProductPriceComponent, SellProductConditionComponent, ProductPhotoComponent, NavBeltComponent, NavCategoriesComponent],
  templateUrl: './sell-product.component.html',
  styleUrl: './sell-product.component.css'
})
export class SellProductComponent {

}
