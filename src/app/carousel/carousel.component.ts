import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  images = [
    { id: 1, src: 'https://m.media-amazon.com/images/I/81fkcBjZndL._AC_SX679_.jpg' },
    { id: 2, src: 'https://m.media-amazon.com/images/I/61Z9q1+EINL._AC_UL320_.jpg' },
    { id: 3, src: 'https://m.media-amazon.com/images/I/81mQU3If8xL._AC_SX679_.jpg' },
    { id: 4, src: 'https://m.media-amazon.com/images/I/41lixdqY0EL.__AC_SY300_SX300_QL70_ML2_.jpg' },
    { id: 5, src: 'https://m.media-amazon.com/images/I/71+4c3udwZL._AC_UL320_.jpg' },
    { id: 6, src: 'https://m.media-amazon.com/images/I/51Pc192A7rL._AC_SX679_.jpg' },
    { id: 7, src: 'https://m.media-amazon.com/images/I/71iNwni9TsL._AC_UL320_.jpg' },
    { id: 8, src: 'https://m.media-amazon.com/images/I/81DWnUaGM1L._AC_UL320_.jpg' },
    { id: 9, src: 'https://m.media-amazon.com/images/I/71MQ73XNbML._AC_UL320_.jpg' },
    { id: 10, src: 'https://m.media-amazon.com/images/I/515dcJmQ+iL._AC_UL320_.jpg' },
    { id: 11, src: 'https://m.media-amazon.com/images/I/91VEhm3hwmL._AC_UL320_.jpg' },
    { id: 12, src: 'https://m.media-amazon.com/images/I/61HQGlVncDL._AC_UL320_.jpg' },
    { id: 13, src: 'https://m.media-amazon.com/images/I/71Sp+fuLymL._AC_UL320_.jpg' },
    { id: 14, src: 'https://m.media-amazon.com/images/I/71o+VzKWCTL._AC_UL320_.jpg' },
    { id: 15, src: 'https://m.media-amazon.com/images/I/51HQo7VApYL._AC_UL320_.jpg' },
  ];

  currentIndex = 0;

  prevSlide() {
    const maxIndex = this.images.length / 2 - 1; // Índice máximo (sin duplicados)
    this.currentIndex = (this.currentIndex - 1 + maxIndex + 1) % (maxIndex + 1);
  }

  nextSlide() {
    const maxIndex = this.images.length / 2 - 1; // Índice máximo (sin duplicados)
    this.currentIndex = (this.currentIndex + 1) % (maxIndex + 1);
  }
}