import { Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.css'
})
export class ProductCarouselComponent {
  product: Product | null = null;
  images: string[] = []; 
  currentIndex: number = 0;
  
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    const products = this.productService.getProducts();
    if (products.length > 0) {
      this.product = products[0];
      this.images = this.product.images ?? [];
    }
  }

  nextSlide(): void {
    if (this.product && this.product.images && this.currentIndex < this.product.images.length - 1) {
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