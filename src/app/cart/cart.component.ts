import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { CartItem } from '../interfaces/cart-item';
import { Product } from '../interfaces/product';
import { FormsModule } from '@angular/forms';
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, NavBeltComponent, NavCategoriesComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  userId: number = 1; // Suponemos que esta es la ID del usuario actual (cambia esto según tu lógica de autenticación)

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  // Cargar productos del carrito del usuario actual
  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems(this.userId);
  }

  // Obtener la primera imagen de un producto
  getFirstImage(images: string[] | undefined): string | null {
    if (!images || images.length === 0) {
      return null; // Retorna null si no hay imágenes
    }
    return images[0]; // Retorna la primera imagen
  }

  // Incrementar la cantidad
  increaseQuantity(index: number): void {
    const item = this.cartItems[index];
    if (!item) {
      console.error('Índice inválido en el carrito');
      return;
    }

    item.quantity += 1;
    this.updateCartItem(index);
  }

  // Decrementar la cantidad
  decreaseQuantity(index: number): void {
    const item = this.cartItems[index];
    if (!item) {
      console.error('Índice inválido en el carrito');
      return;
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
      this.updateCartItem(index);
    } else {
      this.removeItem(index); // Si la cantidad llega a 0, elimina el producto
    }
  }
  // Calcular el ancho de la barra de progreso basado en el estado
calculateProgress(status: 'No pagado' | 'Pagado' | 'Enviado' | 'Recibido'): string {
  switch (status) {
    case 'No pagado':
      return '0%';
    case 'Pagado':
      return '33%';
    case 'Enviado':
      return '66%';
    case 'Recibido':
      return '100%';
    default:
      return '0%';
  }
}

  // Cambiar el estado de un producto usando la barra de progreso
updateStatus(index: number, newStatus: 'No pagado' | 'Pagado' | 'Enviado' | 'Recibido'): void {
  const item = this.cartItems[index];
  if (!item) {
    console.error('Índice inválido en el carrito');
    return;
  }

  this.cartService.changeStatus(this.userId, index, newStatus);
  this.loadCartItems(); // Recarga los productos del carrito
}

  // Actualizar la cantidad desde la entrada de texto
  updateQuantity(index: number, event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (!target) {
      console.error('El evento no tiene un target válido');
      return;
    }

    const value = parseInt(target.value, 10);

    const item = this.cartItems[index];
    if (!item) {
      console.error('Índice inválido en el carrito');
      return;
    }

    if (isNaN(value) || value <= 0) {
      this.removeItem(index); // Si la cantidad es inválida o <= 0, elimina el producto
    } else {
      item.quantity = value;
      this.updateCartItem(index);
    }
  }

  // Guardar cambios en el carrito
  private updateCartItem(index: number): void {
    const item = this.cartItems[index];
    if (!item) {
      console.error('Índice inválido en el carrito');
      return;
    }

    this.cartService.updateCartItem(this.userId, index, { quantity: item.quantity });
  }

  // Eliminar un producto del carrito
  removeItem(index: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.cartService.removeCartItem(this.userId, index);
      this.loadCartItems(); // Recarga los productos del carrito
    }
  }

  // Cambiar el estado de un producto
  changeStatus(index: number, newStatus: 'Pagado' | 'Enviado' | 'Recibido'): void {
    const item = this.cartItems[index];
    if (!item) {
      console.error('Índice inválido en el carrito');
      return;
    }

    this.cartService.changeStatus(this.userId, index, newStatus);
    this.loadCartItems(); // Recarga los productos del carrito
  }

  // Añadir productos predeterminados al carrito
  addDefaultItems(): void {
    const defaultProducts: Product[] = [
      {
        id: 1,
        images: [
          "https://cdn.wallapop.com/images/10420/ia/rg/__/c10420p1106468713/i5438087286.jpg?pictureSize=W640"
        ],
        price: 196,
        title: "Botas esqui tecnica",
        state: "Nuevo",
        location: "Barcelona",
        description: "Botas de esquí marca Nordica tamaño de la suela 295 mm, talla 25-25,5 en buen estado.",
        popularity: 4.8,
        dateAdded: new Date("2024-03-11")
      },
      {
        id: 2,
        images: [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg"
        ],
        price: 49,
        title: "Lámpara de escritorio",
        state: "Usado",
        location: "Madrid",
        description: "Lámpara de escritorio en buen estado, perfecta para estudiar.",
        popularity: 4.5,
        dateAdded: new Date("2024-02-15")
      }
    ];

    // Añadir productos predeterminados al carrito
    defaultProducts.forEach(product => {
      this.cartService.addToCart(this.userId, product, 1); // Añade 1 unidad de cada producto
    });

    // Recargar los productos del carrito
    this.loadCartItems();
  }
}