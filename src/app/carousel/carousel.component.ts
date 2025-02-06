import { Component } from '@angular/core'
import { Product } from '../interfaces/product';


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  images: Product[] = [
     { id: 1, src:'https://m.media-amazon.com/images/I/619NyX2WEPL._AC_SX679_.jpg'},
     { id: 2, src:'https://m.media-amazon.com/images/I/419IPMjp1+L._AC_SX679_.jpg'},
     { id: 3, src:'https://media.flixcar.com/webp/synd-asset/Asus-99809225-vbix8bxyatkzctly_setting_xxx_0_90_end_1000-zoom.png'},
     { id: 4, src:'https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/65038654434d0-iPhone%2015%20Pro%20Natural%20titanium%20png.png'},
     { id: 5, src:'https://m.media-amazon.com/images/I/41cmheUC41L._SY445_SX342_.jpg'},
     { id: 6, src:'https://m.media-amazon.com/images/I/81Yj6Ov5qjL.__AC_SX300_SY300_QL70_ML2_.jpg'},
     { id: 7, src:'https://m.media-amazon.com/images/I/810C0ip6JqL.__AC_SX300_SY300_QL70_ML2_.jpg'},
     { id: 8, src:'https://m.media-amazon.com/images/I/71LnH7HrJQL.__AC_SX300_SY300_QL70_ML2_.jpg'},
     { id: 9, src:'https://m.media-amazon.com/images/I/31y37iCnqoL._SY450_.jpg'},
     { id: 10, src:'https://m.media-amazon.com/images/I/41sSKpKTFkL._AC_UL320_.jpg'},
     { id: 11, src:'https://m.media-amazon.com/images/I/819asEmHTDL.__AC_SY300_SX300_QL70_ML2_.jpg'},
     { id: 12, src:'https://m.media-amazon.com/images/I/51wC4bOfXvL._AC_UL320_.jpg'},
     { id: 13, src:'https://m.media-amazon.com/images/I/71bkpyK4o9L._AC_UL320_.jpg'},
     { id: 14, src:'https://m.media-amazon.com/images/I/61OWblNP5xL._AC_UL320_.jpg'},
     { id: 15, src:'https://m.media-amazon.com/images/I/61Ir6CLUZmL._AC_UL320_.jpg'},
     { id: 16, src:'https://m.media-amazon.com/images/I/81WKnMvIYZL.__AC_SX300_SY300_QL70_ML2_.jpg'},
     { id: 17, src:'https://dlcdnwebimgs.asus.com/files/media/C2118EAC-69AE-4260-AC1D-D574E9575F17/v1/img/display/rog-flow-x16.png'},
     { id: 18, src:'https://m.media-amazon.com/images/I/61HN0wfu3YL.__AC_SX300_SY300_QL70_ML2_.jpg'},
     { id: 19, src:'https://m.media-amazon.com/images/I/51PvLYxiFzL._AC_SY879_.jpg'},
  ];
  
  // Índice de la imagen actual
  x = 0;
  
// Getter para obtener la URL de la imagen dos posiciones atrás
get imagenAnteriorSecundaria() {
  return this.images[(this.x - 2 + this.images.length) % this.images.length];
}

// Getter para obtener la URL de la imagen anterior
get imagenAnteriorPrimaria() {
  return this.images[(this.x - 1 + this.images.length) % this.images.length];
}

// Getter para obtener la URL de la imagen actual
get imagenPrincipal() {
  return this.images[this.x];
}

// Getter para obtener la URL de la imagen siguiente
get imagenSiguientePrimaria() {
  return this.images[(this.x + 1) % this.images.length];
}

// Getter para obtener la URL de la imagen dos posiciones adelante
get imagenSiguienteSecundaria() {
  return this.images[(this.x + 2) % this.images.length];
}

  // Método para ir a la imagen previa
  prevSlide() {
    this.x = (this.x === 0) ? this.images.length - 1 : this.x - 1;
  }
  
  // Método para ir a la siguiente imagen
  nextSlide() {
    this.x = (this.x === this.images.length - 1) ? 0 : this.x + 1;
  }


}
