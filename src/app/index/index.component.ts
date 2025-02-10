import { Component } from '@angular/core';
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { ProductDisplayComponent } from '../product-display/product-display.component';
import { TripleProductDisplayComponent } from "../triple-product-display/triple-product-display.component.spec";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent, CarouselComponent, ProductDisplayComponent, TripleProductDisplayComponent, TripleProductDisplayComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
