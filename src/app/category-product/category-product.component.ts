import { Component } from '@angular/core';
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { CardProductComponent } from '../card-product/card-product.component';

@Component({
  selector: 'app-category-product',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent, CardProductComponent],
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css']
})
export class CategoryProductComponent {

}
