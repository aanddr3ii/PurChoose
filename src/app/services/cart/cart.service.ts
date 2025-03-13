import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartItem } from '../../interfaces/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems'; // Clave base para almacenar carritos

  // Obtener todos los productos del carrito de un usuario específico
  getCartItems(userId: number): CartItem[] {
    const storedCart = localStorage.getItem(`${this.cartKey}_${userId}`);
    const cartItems = storedCart ? JSON.parse(storedCart) : [];

    // Filtrar y corregir productos inválidos
    return cartItems
      .filter((item: any) => item.product && item.product.price !== undefined) // Asegurarse de que product y price existan
      .map((item: CartItem) => ({
        ...item,
        price: Number(item.product?.price) || 0, // Convierte explícitamente a número
        status: item.status || 'No pagado', // Estado predeterminado: 'No pagado'
        quantity: item.quantity || 1 // Cantidad predeterminada: 1
      }));
  }

  // Guardar productos en el carrito de un usuario específico
  private saveCartItems(userId: number, cartItems: CartItem[]): void {
    localStorage.setItem(`${this.cartKey}_${userId}`, JSON.stringify(cartItems));
  }

  // Cambiar el estado de un producto en el carrito de un usuario específico
  changeStatus(userId: number, index: number, newStatus: 'No pagado' | 'Pagado' | 'Enviado' | 'Recibido'): void {
    const cartItems = this.getCartItems(userId);
    if (index < 0 || index >= cartItems.length) {
      console.error('Índice inválido en el carrito');
      return;
    }

    cartItems[index].status = newStatus; // Actualiza el estado
    this.saveCartItems(userId, cartItems); // Guarda los cambios en localStorage
  }

  // Añadir un producto al carrito de un usuario específico
  addToCart(userId: number, product: Product, quantity: number = 1): void {
    const cartItems = this.getCartItems(userId);
    const existingItem = cartItems.find(item => item.product?.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity; // Incrementa la cantidad si ya existe
    } else {
      cartItems.push({
        product,
        quantity,
        price: Number(product.price) || 0, // Usa el precio del producto
        status: 'No pagado' // Estado inicial: No pagado
      });
    }

    this.saveCartItems(userId, cartItems);
  }

  // Actualizar la cantidad o el estado de un producto en el carrito de un usuario específico
  updateCartItem(userId: number, index: number, updatedItem: Partial<CartItem>): void {
    const cartItems = this.getCartItems(userId);
    cartItems[index] = { ...cartItems[index], ...updatedItem };
    this.saveCartItems(userId, cartItems);
  }

  // Eliminar un producto del carrito de un usuario específico
  removeCartItem(userId: number, index: number): void {
    const cartItems = this.getCartItems(userId);
    cartItems.splice(index, 1);
    this.saveCartItems(userId, cartItems);
  }
}