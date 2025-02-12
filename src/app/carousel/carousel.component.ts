import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  images = [
    { id: 1, src: 'https://m.media-amazon.com/images/I/619NyX2WEPL._AC_SX679_.jpg' },
    { id: 2, src: 'https://m.media-amazon.com/images/I/419IPMjp1+L._AC_SX679_.jpg' },
    { id: 3, src: 'https://media.flixcar.com/webp/synd-asset/Asus-99809225-vbix8bxyatkzctly_setting_xxx_0_90_end_1000-zoom.png' },
    { id: 4, src: 'https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/65038654434d0-iPhone%2015%20Pro%20Natural%20titanium%20png.png' },
    { id: 5, src: 'https://m.media-amazon.com/images/I/41cmheUC41L._SY445_SX342_.jpg' }
  ];

  currentIndex = 0;

  ngOnInit() {
    // Duplicar imágenes para crear un bucle infinito
    this.images = [...this.images, ...this.images];
  }

  prevSlide() {
    const maxIndex = this.images.length / 2 - 1; // Índice máximo (sin duplicados)
    this.currentIndex = (this.currentIndex - 1 + maxIndex + 1) % (maxIndex + 1);
  }

  nextSlide() {
    const maxIndex = this.images.length / 2 - 1; // Índice máximo (sin duplicados)
    this.currentIndex = (this.currentIndex + 1) % (maxIndex + 1);
  }
}