import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { CartItem } from '../interfaces/cart-item';
import { AuthService } from '../services/authService/auth.service';
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { CART_ITEM_STATUS } from '../models/cart-status';
import { CartItemStatus } from '../models/cart-status'; // Importa el tipo seguro

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  userId: number = 0;

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    if (!this.userId) {
      console.error('Usuario no autenticado');
      alert('Debes iniciar sesión para ver tu carrito.');
      return;
    }

    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems(this.userId).subscribe({
      next: (items) => {
        console.log('Datos del carrito cargados:', items);
        this.cartItems = items;
      },
      error: (error) => {
        console.error('Error al cargar los productos del carrito:', error);
      },
    });
  }

  increaseQuantity(cartItemId: number): void {
    const item = this.cartItems.find((i) => i.id === cartItemId);
    if (!item) return;

    item.quantity += 1;
    this.updateCartItem(cartItemId, { quantity: item.quantity });
  }

  decreaseQuantity(cartItemId: number): void {
    const item = this.cartItems.find((i) => i.id === cartItemId);
    if (!item) return;

    if (item.quantity > 1) {
      item.quantity -= 1;
      this.updateCartItem(cartItemId, { quantity: item.quantity });
    } else {
      this.removeItem(cartItemId);
    }
  }

  updateQuantity(cartItemId: number, event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (!target) return;

    const value = parseInt(target.value, 10);
    const item = this.cartItems.find((i) => i.id === cartItemId);
    if (!item) return;

    if (isNaN(value) || value <= 0) {
      this.removeItem(cartItemId);
    } else {
      item.quantity = value;
      this.updateCartItem(cartItemId, { quantity: item.quantity });
    }
  }

  private updateCartItem(cartItemId: number, updates: Partial<CartItem>): void {
    this.cartService.updateCartItem(cartItemId, updates).subscribe({
      next: () => {
        console.log('Producto actualizado correctamente');
      },
      error: (error) => {
        console.error('Error al actualizar el producto:', error);
      },
    });
  }

  removeItem(cartItemId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.cartService.removeCartItem(cartItemId).subscribe({
        next: () => {
          this.loadCartItems();
        },
        error: (error) => {
          console.error('Error al eliminar el producto:', error);
        },
      });
    }
  }

  changeStatus(cartItemId: number, newStatus: CartItemStatus): void {
    if (!Object.values(CART_ITEM_STATUS).includes(newStatus)) {
      console.error('Estado inválido:', newStatus);
      return;
    }
  
    console.log('Cambiando estado del producto con ID:', cartItemId); // Depuración: Imprime el ID del producto
    console.log('Nuevo estado:', newStatus); // Depuración: Imprime el nuevo estado
  
    this.cartService.changeStatus(cartItemId, newStatus).subscribe({
      next: () => {
        console.log('Estado actualizado correctamente');
        this.loadCartItems(); // Recarga los productos del carrito
      },
      error: (error) => {
        console.error('Error al cambiar el estado del producto:', error);
      },
    });
  }
  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  calculateShipping(): number {
    const subtotal = this.calculateSubtotal();
    return subtotal >= 500 ? 0 : 10;
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateShipping();
  }

  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }
}