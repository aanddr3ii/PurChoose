import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { CartItem } from '../interfaces/cart-item';
import { Product } from '../interfaces/product';
import { AuthService } from '../services/authService/auth.service'; // Importamos el servicio de autenticación
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent], // Asegúrate de importar solo los componentes necesarios aquí
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Productos no pagados (carrito)
  userId: number = 1; // Suponemos que esta es la ID del usuario actual
  isUserAdmin: boolean = false; // Indicador de administrador

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCartItems(); // Cargar productos del carrito
    this.checkIfUserIsAdmin(); // Verificar si el usuario es administrador
  }

  // Cargar productos del carrito del usuario actual
  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems(this.userId).filter(item => item.status === 'No pagado');
  }

  // Verificar si el usuario es administrador
  checkIfUserIsAdmin(): void {
    const userRole = this.authService.getUserRole(); // Obtenemos el rol del usuario
    this.isUserAdmin = userRole === 'admin'; // El usuario es admin si su rol es 'admin'
  }

  // Calcular el ancho de la barra de progreso basado en el estado
  calculateProgress(status: 'No pagado' | 'Pagado' | 'Enviado' | 'Recibido'): string {
    switch (status) {
      case 'No pagado':
        return '0%'; // 0% completado
      case 'Pagado':
        return '33%'; // 33% completado
      case 'Enviado':
        return '66%'; // 66% completado
      case 'Recibido':
        return '100%'; // 100% completado
      default:
        return '0%'; // Por defecto, 0% si el estado no es reconocido
    }
  }

  // Obtener la primera imagen de un producto
  getFirstImage(images: string[] | undefined): string | null {
    if (!images || images.length === 0) {
      return null; // Retorna null si no hay imágenes
    }
    return images[0]; // Retorna la primera imagen
  }

  // Calcular el subtotal
  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Calcular el costo de envío (ejemplo: envío gratis si el subtotal supera 500€)
  calculateShipping(): number {
    if (this.cartItems.length === 0) {
      return 0; // Si no hay productos en el carrito, el envío es 0€
    }

    const subtotal = this.calculateSubtotal();
    return subtotal >= 500 ? 0 : 10; // Envío gratis si el subtotal es mayor o igual a 500€
  }

  // Verificar si el carrito está vacío
  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  // Calcular el total a pagar (subtotal + envío)
  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateShipping();
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

  // Limpiar datos residuales del historial en localStorage
  clearHistoryData(): void {
    if (confirm('¿Estás seguro de que quieres eliminar todos los datos residuales del historial?')) {
      const allItems = this.cartService.getCartItems(this.userId);

      // Filtrar solo los productos no pagados (eliminar productos pagados)
      const filteredItems = allItems.filter(item => item.status === 'No pagado');

      // Guardar solo los productos no pagados en localStorage
      this.cartService.saveCartItems(this.userId, filteredItems);

      // Recargar los productos del carrito
      this.loadCartItems();

      alert('Datos residuales del historial eliminados correctamente.');
    }
  }

  // Cambiar el estado de un producto
  changeStatus(index: number, newStatus: 'No pagado' | 'Pagado' | 'Enviado' | 'Recibido'): void {
    this.cartService.changeStatus(this.userId, index, newStatus);
    this.loadCartItems(); // Recarga los productos del carrito
  }

  // Proceder al pago (simulado)
  proceedToCheckout(): void {
    const confirmPayment = confirm('¿Deseas proceder al pago? (Simulación: Introduce detalles de tarjeta)');
    if (confirmPayment) {
      // Marcar todos los productos del carrito como "Pagado"
      this.cartItems.forEach((item, index) => {
        this.cartService.changeStatus(this.userId, index, 'Pagado');
      });

      // Recargar los productos del carrito
      this.loadCartItems();

      alert('Pago completado. Todos los productos han sido marcados como "Pagado".');
    }
  }
// Añadir productos predeterminados al carrito
addDefaultItems(): void {
  // Limpiar datos residuales antes de añadir productos predeterminados
  this.clearHistoryData();

  const defaultProducts: Product[] = [
    {
      id: 1, // ID fijo para pruebas
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
      id: 2, // ID fijo para pruebas
      images: [
        "https://www.barcelonaled.com/20510-large_default/lampara-mono-de-mesa-de-resina-rila.jpg",
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
    this.cartService.addToCart(this.userId, product, 1, 'No pagado'); // Estado inicial: No pagado
  });

  // Recargar los productos del carrito
  this.loadCartItems();

  alert('Productos predeterminados añadidos correctamente.');
}
}