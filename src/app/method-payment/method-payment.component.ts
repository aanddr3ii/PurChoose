import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-method-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './method-payment.component.html',
  styleUrl: './method-payment.component.css'
})
export class MethodPaymentComponent {
  private fb = inject(FormBuilder);

  paymentMethod = signal<'apple-pay' | 'google-pay' | 'paypal' | 'card' | null>(null);


  shippingForm = this.fb.group({
    fullName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    country: ['', Validators.required]
  });

  cartItems = signal([
    { name: 'Producto A', price: 29.99 },
    { name: 'Producto B', price: 15.5 }
  ]);

  totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.price, 0)
  );

  confirmPurchase() {
    if (this.shippingForm.valid && this.paymentMethod()) {
      console.log('Datos enviados:', {
        shippingData: this.shippingForm.value,
        paymentMethod: this.paymentMethod(),
        total: this.totalPrice()
      });
      // Aquí llamas a tu servicio
    } else {
      this.shippingForm.markAllAsTouched();
    }
  }

}
