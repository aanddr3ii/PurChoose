import { Component } from '@angular/core';
import { NavBeltComponent } from '../../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../../nav-categories/nav-categories.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { ProductDisplayComponent } from '../product-display/product-display.component';
import { ProductDisplay2Component } from '../product-display2/product-display2.component';
import { TripleProductDisplayComponent } from '../triple-product-display/triple-product-display.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent, CarouselComponent, ProductDisplayComponent, ProductDisplay2Component, TripleProductDisplayComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
