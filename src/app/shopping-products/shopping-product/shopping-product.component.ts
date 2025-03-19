import { Component } from '@angular/core';
import { ShoppingBoxComponent } from "../shopping-box/shopping-box.component";
import { NavBeltComponent } from "../../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../../nav-categories/nav-categories.component";
import { LeftBarComponent } from "../../Inboxx/left-bar/left-bar.component";

@Component({
  selector: 'app-shopping-product',
  standalone: true,
  imports: [ShoppingBoxComponent, NavBeltComponent, NavCategoriesComponent, LeftBarComponent],
  templateUrl: './shopping-product.component.html',
  styleUrl: './shopping-product.component.css'
})
export class ShoppingProductComponent {

}
