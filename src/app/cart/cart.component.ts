import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CartService } from '../services/cart/cart.service';
import { CartItem } from '../interfaces/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [FormsModule] // Añade FormsModule aquí
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  userId: number = 1; // Suponemos que esta es la ID del usuario actual

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems(this.userId);
  }

  changeStatus(index: number, newStatus: 'Pagado' | 'Enviado' | 'Recibido'): void {
    this.cartService.changeStatus(this.userId, index, newStatus);
    this.loadCartItems();
  }

  removeItem(index: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.cartService.removeCartItem(this.userId, index);
      this.loadCartItems();
    }
  }
}