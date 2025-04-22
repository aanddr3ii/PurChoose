import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { CartItem } from '../interfaces/cart-item';
import { Product } from '../interfaces/product';
import { AuthService } from '../services/authService/auth.service'; // Importamos el servicio de autenticación
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { CART_ITEM_STATUS, CartItemStatus } from '../models/cart-status';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent, RouterLink], // Asegúrate de importar solo los componentes necesarios aquí
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Productos en el carrito
  userId: number = 0; // ID del usuario logueado

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Obtiene el ID del usuario logueado
    this.loadCartItems(); // Carga los productos del carrito
  }

  // Cargar productos del carrito del usuario actual
  loadCartItems(): void {
    this.cartService.getCartItems(this.userId).subscribe({
      next: (items) => {
        this.cartItems = items;
      },
      error: (error) => {
        console.error('Error al cargar los productos del carrito:', error);
      },
    });
  }

  // Incrementar la cantidad de un producto
  increaseQuantity(cartItemId: number): void {
    const item = this.cartItems.find((i) => i.id === cartItemId);
    if (!item) {
      console.error('Producto no encontrado en el carrito');
      return;
    }

    item.quantity += 1;
    this.updateCartItem(cartItemId, { quantity: item.quantity });
  }

  // Decrementar la cantidad de un producto
  decreaseQuantity(cartItemId: number): void {
    const item = this.cartItems.find((i) => i.id === cartItemId);
    if (!item) {
      console.error('Producto no encontrado en el carrito');
      return;
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
      this.updateCartItem(cartItemId, { quantity: item.quantity });
    } else {
      this.removeItem(cartItemId); // Elimina el producto si la cantidad llega a 0
    }
  }

  // Actualizar la cantidad de un producto
  updateQuantity(cartItemId: number, event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (!target) {
      console.error('El evento no tiene un target válido');
      return;
    }

    const value = parseInt(target.value, 10);
    const item = this.cartItems.find((i) => i.id === cartItemId);
    if (!item) {
      console.error('Producto no encontrado en el carrito');
      return;
    }

    if (isNaN(value) || value <= 0) {
      this.removeItem(cartItemId); // Elimina el producto si la cantidad es inválida o <= 0
    } else {
      item.quantity = value;
      this.updateCartItem(cartItemId, { quantity: item.quantity });
    }
  }

  // Guardar cambios en un producto del carrito
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

  // Eliminar un producto del carrito
  removeItem(cartItemId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.cartService.removeCartItem(cartItemId).subscribe({
        next: () => {
          this.loadCartItems(); // Recarga los productos del carrito
        },
        error: (error) => {
          console.error('Error al eliminar el producto:', error);
        },
      });
    }
  }

  changeStatus(cartItemId: number, newStatus: string): void {
    // Valida que el estado sea uno de los valores permitidos
    if (Object.values(CART_ITEM_STATUS).includes(newStatus as CartItemStatus)) {
      this.cartService.changeStatus(cartItemId, newStatus as CartItemStatus).subscribe({
        next: () => {
          this.loadCartItems(); // Recarga los productos del carrito
        },
        error: (error) => {
          console.error('Error al cambiar el estado del producto:', error);
        },
      });
    } else {
      console.error('Estado inválido:', newStatus);
    }
  }

  // Calcular el subtotal del carrito
  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Calcular el costo de envío (ejemplo: envío gratis si el subtotal supera 500€)
  calculateShipping(): number {
    const subtotal = this.calculateSubtotal();
    return subtotal >= 500 ? 0 : 10; // Envío gratis si el subtotal es mayor o igual a 500€
  }

  // Calcular el total a pagar (subtotal + envío)
  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateShipping();
  }

  // Verificar si el carrito está vacío
  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }
}