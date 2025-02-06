import { Component } from '@angular/core';
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { ProductDisplayComponent } from '../product-display/product-display.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent, CarouselComponent, ProductDisplayComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
