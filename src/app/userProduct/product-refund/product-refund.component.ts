import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-refund',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-refund.component.html',
  styleUrl: './product-refund.component.css'
})
export class ProductRefundComponent {
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
