import { Component } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-product-refund',
  standalone: true,
  imports: [],
  templateUrl: './product-refund.component.html',
  styleUrl: './product-refund.component.css'
})
export class ProductRefundComponent {
  isInfoVisible: boolean = false;

  refundTitle = {
    title: 'Protección PurChoose',
    descrptionPart1:'Compra sin preocupaciones mediante nuestro servicio de envíos. Transacción',
    descrptionPart2:'protegida con reembolso, pagos seguros y ayuda siempre que la necesites.'
  };

  refundInfo = {
    title: 'Protección PurChoose',
    subTitlePart1: 'Cuando compras tu producto mediante',
    subTitlePart2: 'nuestro servicio de envío, cobramos una tarifa',
    subTitlePart3:'por:',


    ParagraphonePart1: 'Proteger tu dinero hasta que compruebes',
    ParagraphonePart2: 'que el producto está en orden',

    ParagraphtwoPart1:'Reembolsar el importe si el producto no',
    ParagraphtwoPart2:'es como se describía. Si necesitas.',
    ParagraphtwoPart3:'devolverlo, es gratis',

    ParagraphthreePart1:'Reembolsarte si el producto se pierde o', 
    ParagraphthreePart2:'resulta dañado durante el envío',   

    ParagraphfourPart1:'Asistencia cuando la necesites',
  };

  toggleInfo(): void {
    this.isInfoVisible = !this.isInfoVisible;
  }
}
