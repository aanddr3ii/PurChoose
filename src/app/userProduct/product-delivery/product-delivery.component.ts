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

  toggleInfo(): void {
    this.isInfoVisible = !this.isInfoVisible;
  }

  closeModal(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
        this.isInfoVisible = false;
    }
  }
}
