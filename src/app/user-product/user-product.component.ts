import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Review } from '../interfaces/review';

@Component({
  selector: 'app-user-product',
  standalone: true,
  imports: [CurrencyPipe],
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
    images: [
      'https://cdn.wallapop.com/images/10420/i1/6c/__/c10420p1090366878/i5357077987.jpg?pictureSize=W640',
      'https://cdn.wallapop.com/images/10420/i1/6c/__/c10420p1090366878/i5357078072.jpg?pictureSize=W640',
      'https://cdn.wallapop.com/images/10420/i1/6c/__/c10420p1090366878/i5357078080.jpg?pictureSize=W640'
    ],
    price: 40,
    title: 'Botas para la nieve',
    state: 'nuevo',
    description: 'Botas Técnica de esquí de pista o descenso, gama alta, talla 29.5. Como una talla de calzado 38-39. Ligeras, calientes y cómodas, muy poco uso.',
    location: 'Lleida',
    deliveryOptions: [
      { type: 'pickup', icon: 'https://prod-delivery-resources.wallapop.com/default_office_v2.png', text: 'En punto de recogida desde 2.59 EUR' },
      { type: 'home', icon: 'https://prod-delivery-resources.wallapop.com/default_home_v2.png', text: 'En mi dirección desde 3.49 EUR' }
    ],
    refund: [
      { type: 'logo and title', icon: 'https://prod-delivery-resources.wallapop.com/default_office_v2.png', text: 'Protección PurChoose' },
      { type: 'text', text: 'Compra sin preocupaciones mediante nuestro servicio de envíos. Transacción protegida con reembolso, pagos seguros y ayuda siempre que la necesites.' }
    ],
  };

  /* info delivery */
  infoDelivery = {
    estimatedTime: '3 - 7 días',
    details: [
      'El tiempo que tiene el vendedor para entregar el paquete a la empresa de transporte (de 1 a 5 días).',
      'Una vez que tengan el paquete, el plazo de entrega dependerá de la empresa de transporte seleccionada.'
    ]
  };
  /* info refund */
  infoRefund = {
    protection: 'Protección PurChoose',
    details: [
      'Proteger tu dinero hasta que compruebes que el producto está en orden.',
      'Reembolsar el importe si el producto no es como se describía. Si necesitas devolverlo, es gratis.',
      'Reembolsarte si el producto se pierde o resulta dañado durante el envío.',
      'Asistencia cuando la necesites.'
    ]
  };
  

  /* user reviews */
  reviews: Review[] = [
    { id: 1, text: 'Muy contento con la compra', rating: 5 },
    { id: 2, text: 'Las botas están en perfecto estado', rating: 4 },
    { id: 3, text: 'Buena calidad', rating: 5 },
    { id: 4, text: 'Las botas son muy cómodas', rating: 4 },
    { id: 5, text: 'Recomendado', rating: 5 }
  ];
  

  // para la foto
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
