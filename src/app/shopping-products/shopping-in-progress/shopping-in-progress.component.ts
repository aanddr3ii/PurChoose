import { Component } from '@angular/core';
import { ShoppingBoxComponent } from "../shopping-box/shopping-box.component";
import { NavBeltComponent } from "../../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../../nav-categories/nav-categories.component";
import { LeftBarComponent } from "../../Inboxx/left-bar/left-bar.component";

@Component({
  selector: 'app-shopping-in-progress',
  standalone: true,
  imports: [ShoppingBoxComponent, NavBeltComponent, NavCategoriesComponent, LeftBarComponent],
  templateUrl: './shopping-in-progress.component.html',
  styleUrl: './shopping-in-progress.component.css'
})
export class ShoppingInProgressComponent {

}
