import { Component } from '@angular/core';
import { ShoppingBoxComponent } from "../shopping-box/shopping-box.component";
import { NavBeltComponent } from "../../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../../nav-categories/nav-categories.component";
import { LeftBarComponent } from "../../Inboxx/left-bar/left-bar.component";

@Component({
  selector: 'app-shopping-finalized',
  standalone: true,
  imports: [ShoppingBoxComponent, NavBeltComponent, NavCategoriesComponent, LeftBarComponent],
  templateUrl: './shopping-finalized.component.html',
  styleUrl: './shopping-finalized.component.css'
})
export class ShoppingFinalizedComponent {

}
