import { Component } from '@angular/core';
import { info } from 'console';

@Component({
  selector: 'app-product-delivery',
  standalone: true,
  imports: [],
  templateUrl: './product-delivery.component.html',
  styleUrl: './product-delivery.component.css'
})
export class ProductDeliveryComponent {
  isInfoVisible: boolean = false;

  productTitle = {
    estimatedTime: 'Entrega en 4 - 8 días'
  };

  productDelivery = {
    pointPicture: 'https://prod-delivery-resources.wallapop.com/default_office_v2.png',
    deliveryPointP: 'En punto de recogida',
    deliveryPoint: 'desde 2.59 EUR',

    homePicture: 'https://prod-delivery-resources.wallapop.com/default_home_v2.png',
    deliveryHomeP: 'En mi dirección',
    deliveryHome: 'desde 3.49 EUR',
  };

  productInfo = {
    infoTitle: 'Entrega en 4 - 8 días',
    infosubTitle: 'Calculamos la fecha de entrega teniendo en cuenta que:',
    infoParagraph1: 'El tiempo que tiene el vendedor para entregar el paquete a la empresa de transporte (',
    infoParagraph1B:'de 1 a 5 días',
    infoParagraph11: ').',

    infoParagraph2: 'Una vez que tengan el paquete, el',
    infoParagraph2B:'plazo de entrega',
    infoParagraph22:'dependerá de la empresa de transporte seleccionada.'
  };

  toggleInfo(): void {
    this.isInfoVisible = !this.isInfoVisible;
  }
}
