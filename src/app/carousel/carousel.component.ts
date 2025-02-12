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
    { id: 5, src: 'https://m.media-amazon.com/images/I/41cmheUC41L._SY445_SX342_.jpg' },
    { id: 6, src: 'https://m.media-amazon.com/images/I/81Yj6Ov5qjL.__AC_SX300_SY300_QL70_ML2_.jpg' },
    { id: 7, src: 'https://m.media-amazon.com/images/I/810C0ip6JqL.__AC_SX300_SY300_QL70_ML2_.jpg' },
    { id: 8, src: 'https://m.media-amazon.com/images/I/71LnH7HrJQL.__AC_SX300_SY300_QL70_ML2_.jpg' },
    { id: 9, src: 'https://m.media-amazon.com/images/I/31y37iCnqoL._SY450_.jpg' },
    { id: 10, src: 'https://m.media-amazon.com/images/I/41sSKpKTFkL._AC_UL320_.jpg' }
  ];

  x = 0;

  // Getters para obtener las imágenes
  get imagenAnteriorSecundaria() {
    return this.images[(this.x - 2 + this.images.length) % this.images.length];
  }

  get imagenAnteriorPrimaria() {
    return this.images[(this.x - 1 + this.images.length) % this.images.length];
  }

  get imagenPrincipal() {
    return this.images[this.x];
  }

  get imagenSiguientePrimaria() {
    return this.images[(this.x + 1) % this.images.length];
  }

  get imagenSiguienteSecundaria() {
    return this.images[(this.x + 2) % this.images.length];
  }

  @ViewChild('slider') slider!: ElementRef; // Referencia al contenedor .image-container

  ngOnInit() {
    // Duplicar imágenes para crear un bucle infinito
    this.images = [
      ...this.images.slice(-2), // Añadir las dos últimas imágenes al inicio
      ...this.images,
      ...this.images.slice(0, 2) // Añadir las dos primeras imágenes al final
    ];
    this.x = 2; // Iniciar desde la tercera imagen (la primera real)
  }

  prevSlide() {
    this.x = (this.x - 1 + this.images.length) % this.images.length; // Bucle infinito hacia atrás
    this.applyTransition();
  }

  nextSlide() {
    this.x = (this.x + 1) % this.images.length; // Bucle infinito hacia adelante
    this.applyTransition();
  }

  // Variables para el arrastre
  isDragging = false;
  startX = 0;
  currentX = 0;

  onDragStart(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;
  }

  onDragMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.currentX = event.clientX - this.startX;
    const sliderElement = this.slider.nativeElement;
    sliderElement.style.transform = `translateX(${this.currentX}px)`;
  }

  onDragEnd() {
    this.isDragging = false;
    const threshold = 50; // Umbral para cambiar de imagen

    if (this.currentX < -threshold) {
      this.nextSlide();
    } else if (this.currentX > threshold) {
      this.prevSlide();
    }

    // Restablecer posición
    this.currentX = 0;
    this.applyTransition();
  }

  applyTransition() {
    const sliderElement = this.slider.nativeElement;
    const imageWidth = 300; // Ancho de cada imagen principal
    const translateX = -this.x * imageWidth; // Calcular el desplazamiento basado en el índice actual

    // Aplicar la transición
    sliderElement.style.transition = 'transform 0.5s ease-in-out';
    sliderElement.style.transform = `translateX(${translateX}px)`;

    // Reposicionar el carrusel si estamos en los extremos
    if (this.x === this.images.length - 3) {
      setTimeout(() => {
        this.x = 2; // Reiniciar el índice
        sliderElement.style.transition = 'none'; // Desactivar la transición temporalmente
        sliderElement.style.transform = `translateX(-${this.x * imageWidth}px)`;
      }, 500); // Esperar a que termine la animación
    } else if (this.x === 2) {
      setTimeout(() => {
        this.x = this.images.length - 3; // Ir al final
        sliderElement.style.transition = 'none'; // Desactivar la transición temporalmente
        sliderElement.style.transform = `translateX(-${this.x * imageWidth}px)`;
      }, 500); // Esperar a que termine la animación
    }
  }
}