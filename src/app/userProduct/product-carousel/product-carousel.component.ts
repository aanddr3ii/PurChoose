import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.css'
})
export class ProductCarouselComponent {
  
  products: Product[] = [
    { id: 1, src: 'https://cdn.wallapop.com/images/10420/ia/rg/__/c10420p1106468713/i5438087286.jpg?pictureSize=W640' },
    { id: 2, src: 'https://cdn.wallapop.com/images/10420/ia/rg/__/c10420p1106468713/i5438087372.jpg?pictureSize=W640' },
    { id: 3, src: 'https://cdn.wallapop.com/images/10420/ia/rg/__/c10420p1106468713/i5438087391.jpg?pictureSize=W640' }
  ];

  currentIndex: number = 0;

  nextSlide(): void {
    if (this.currentIndex < this.products.length - 1) {
      this.currentIndex++;
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToImage(index: number): void {
    this.currentIndex = index;
  }


}
