import { Component } from '@angular/core';

@Component({
  selector: 'app-user-product',
  standalone: true,
  imports: [],
  templateUrl: './user-product.component.html',
  styleUrl: './user-product.component.css'
})
export class UserProductComponent {

  user = {
    name: 'Paco',
    avatar: 'https://s1.abcstatics.com/media/play/2019/07/16/paco-porras-kdxC--1248x698@abc.jpg',
    rating: 4.5
  };
  
  product = {
    price: 40,
    title: 'Botas para la nieve',
    location: 'Lleida',
    description: 'Botas Técnica de esquí de pista o descenso, gama alta, talla 29.5. Como una talla de calzado 38-39. Ligeras, calientes y cómodas, muy poco uso.',
    images: [
        'https://cdn.wallapop.com/images/10420/i1/6c/__/c10420p1090366878/i5357077987.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i1/6c/__/c10420p1090366878/i5357078072.jpg?pictureSize=W640',
        'https://cdn.wallapop.com/images/10420/i1/6c/__/c10420p1090366878/i5357078080.jpg?pictureSize=W640'
    ],
    deliveryOptions: [
      { type: 'pickup', icon: 'https://prod-delivery-resources.wallapop.com/default_office_v2.png', text: 'En punto de recogida desde 2.59 EUR' },
      { type: 'home', icon: 'https://prod-delivery-resources.wallapop.com/default_home_v2.png', text: 'En mi dirección desde 3.49 EUR' }
    ]
  };
  
  currentImage = 0;
  
  nextSlide(): void {
    this.currentImage = (this.currentImage + 1) % this.product.images.length;
  }
  
  prevSlide(): void {
    this.currentImage = (this.currentImage - 1 + this.product.images.length) % this.product.images.length;
  }
  
  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }  

}
