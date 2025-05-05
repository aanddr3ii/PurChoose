import { Component, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from '../services/paymentService/payment.service';
import { User } from '../interfaces/user';
import { UserService } from '../services/userService/user.service';

import { CartItem } from '../interfaces/cart-item';
import { CartService } from '../services/cart/cart.service';
import { AuthService } from '../services/authService/auth.service';
import { HttpClient } from '@angular/common/http';

import { forkJoin, of } from 'rxjs'; 
import { catchError } from 'rxjs/operators';


import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-method-payment',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './method-payment.component.html',
  styleUrl: './method-payment.component.css'
})
export class MethodPaymentComponent {

  //  PROPIEDADES Y ARRAYS
  tarjetas: { numero: string; tipo: string; fechaExpiracion: string; cvc: string }[] = [];
  serviciosPago: { nombre: string; email: string }[] = [];
  prefixes = [
    { value: '+1', flag: '🇺🇸' },
    { value: '+351', flag: '🇵🇹' },
    { value: '+33', flag: '🇫🇷' },
    { value: '+34', flag: '🇪🇸' },
  ];

  // Estado del popup
  mostrarPopup = false;
  servicioSeleccionado: string | null = null;

  // Datos para formularios
  nuevaTarjeta: { tipo?: string; numero?: string; fechaExpiracion?: string; cvc?: string; index?: number } = {};
  nuevoServicio: { nombre?: string; email?: string; index?: number } = {};

  // Formulario y usuario
  editForm!: FormGroup;
  user!: User;

  // Mensaje de error
  errorMensaje: string = '';


  // CONSTRUCTOR
  constructor(
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private userService: UserService,
    private cartService: CartService, private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  //  CICLO DE VIDA
  ngOnInit(): void {
    this.loadTarjetas();
    this.loadServiciosPago();
  }
  
  loadTarjetas(): void {
    this.paymentService.getTarjetas().subscribe({
      next: (data) => {
        this.tarjetas = data;
      },
      error: (error) => {
        console.error('Error al cargar las tarjetas:', error);
        alert('Ocurrió un error al cargar tus tarjetas.');
      }
    });
  }
  
  loadServiciosPago(): void {
    this.paymentService.getServiciosPago().subscribe({
      next: (data) => {
        this.serviciosPago = data;
      },
      error: (error) => {
        console.error('Error al cargar los servicios de pago:', error);
        alert('Ocurrió un error al cargar tus servicios de pago.');
      }
    });
    
    this.editForm.get('password')?.valueChanges.subscribe((value) => {
      if (value) {
        this.editForm.get('password_confirmation')?.setValidators([Validators.required]);
      } else {
        this.editForm.get('password_confirmation')?.clearValidators();
      }
      this.editForm.get('password_confirmation')?.updateValueAndValidity();
    });
  }

  // MÉTODOS DEL FORMULARIO
  onSubmit(): void {
    if (this.editForm.valid) {
      if (!this.user.id) {
        this.showErrorPopup('Error: No se encontró el ID del usuario.');
        return;
      }

      const formValues = this.editForm.value;

      const updatedUserData = {
        name: formValues.name,
        email: formValues.email,
        prefijo: formValues.prefijo,
        telefono: formValues.phone ? `${formValues.prefijo}${formValues.phone}` : null,
        ubicacion: formValues.location,
      };

      this.userService.editUserInApi(this.user.id, updatedUserData).subscribe({
        next: (response) => {
          this.userService.updateCurrentUser(response.user);
          this.showSuccessPopup('¡Cambios guardados exitosamente!');
        },
        error: (error) => {
          if (error.error && error.error.message) {
            this.showErrorPopup(error.error.message);
          } else {
            this.showErrorPopup('Ocurrió un error inesperado.');
          }
        },
      });
    } else {
      this.showErrorPopup('Por favor, completa todos los campos obligatorios.');
    }
  }

  showSuccessPopup(message: string): void {
    alert(message);
  }

  showErrorPopup(message: string): void {
    alert(message);
  }

  agregarOEditarTarjeta(): void {
    const { tipo, numero, fechaExpiracion, cvc, index } = this.nuevaTarjeta;
    this.errorMensaje = '';
  
    const numeroSanitizado = (numero ?? '').replace(/\s+/g, '');
  
    if (!tipo || !numeroSanitizado || !fechaExpiracion || !cvc) {
      this.errorMensaje = 'Por favor, completa todos los campos.';
      return;
    }
  
    if (!/^\d{16}$/.test(numeroSanitizado)) {
      this.errorMensaje = 'El número de tarjeta debe tener 16 dígitos.';
      return;
    }
  
    if (!/^\d{3}$/.test(cvc)) {
      this.errorMensaje = 'El CVC debe tener exactamente 3 dígitos numéricos.';
      return;
    }
  
    const fechaRegex = /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/;
    if (!fechaRegex.test(fechaExpiracion)) {
      this.errorMensaje = 'La fecha debe tener el formato MM/YY o MM/YYYY.';
      return;
    }
  
    const [mesStr, anioStr] = fechaExpiracion.split('/');
    const mes = parseInt(mesStr, 10);
    const anio = parseInt(anioStr.length === 2 ? '20' + anioStr : anioStr, 10);
  
    const ahora = new Date();
    const mesActual = ahora.getMonth() + 1;
    const anioActual = ahora.getFullYear();
  
    if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
      this.errorMensaje = 'La fecha no puede ser anterior al mes actual.';
      return;
    }
  
    // Si pasa todas las validaciones
this.paymentService.addOrUpdateTarjeta(
  { 
    tipo, 
    numero: numeroSanitizado, 
    fechaExpiracion: fechaExpiracion, // Ajustado: usa 'fechaExpiracion'
    cvc 
  },
  index
).subscribe({
  next: () => {
    alert('Tarjeta guardada exitosamente.');
    this.loadTarjetas(); // Recargar tarjetas desde el backend
    this.cerrarPopup();
  },
  error: (error: any) => { // Añadimos el tipo 'any' o mejor aún, 'HttpEvent | HttpErrorResponse'
    console.error('Error al guardar la tarjeta:', error);
    this.showErrorPopup('Ocurrió un error al guardar la tarjeta.');
  }
});
  }
  

  abrirPopupTarjeta(tipo?: string, index?: number) {
    this.mostrarPopup = true;

    if (index !== undefined) {
      const tarjetaExistente = this.tarjetas[index];
      this.nuevaTarjeta = { ...tarjetaExistente, index };
    } else {
      this.nuevaTarjeta = { tipo: '', numero: '', fechaExpiracion: '', cvc: '', index: undefined };
    }

    document.body.classList.add('no-scroll'); // <-- Aquí sí se aplica bien
  }

  eliminarTarjeta(index: number): void {
    this.paymentService.deleteTarjeta(index).subscribe({
      next: () => {
        alert('Tarjeta eliminada exitosamente.');
        this.loadTarjetas(); // Recargar desde el backend
      },
      error: (error: any) => {
        console.error('Error al eliminar la tarjeta:', error);
        this.showErrorPopup('Ocurrió un error al eliminar la tarjeta.');
      }
    });
  }

  // SERVICIOS DE PAGO
agregarOEditarServicio(): void {
  const { nombre, email, index } = this.nuevoServicio;

  if (!nombre || !email) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Llamamos al servicio y nos suscribimos a la respuesta
  this.paymentService.addOrUpdateServicio({ nombre, email }, index).subscribe({
    next: () => {
      alert('Servicio de pago guardado exitosamente.');
      this.loadServiciosPago(); // Recargar servicios desde el backend
      this.cerrarPopup();
    },
    error: (error: any) => {
      console.error('Error al guardar el servicio de pago:', error);
      this.showErrorPopup('Ocurrió un error al guardar el servicio de pago.');
    }
  });
}

abrirPopupServicio(nombre: string, index?: number): void {
  this.mostrarPopup = true;
  this.servicioSeleccionado = nombre;

  if (index !== undefined && this.serviciosPago[index]) {
    const servicioExistente = this.serviciosPago[index];
    this.nuevoServicio = { ...servicioExistente, index };
  } else {
    this.nuevoServicio = { nombre, email: '', index: undefined };
  }

  document.body.classList.add('no-scroll');
}

eliminarServicio(index: number): void {
  this.paymentService.deleteServicio(index).subscribe({
    next: () => {
      alert('Servicio de pago eliminado exitosamente.');
      this.loadServiciosPago(); // Recargar servicios desde el backend
    },
    error: (error: any) => {
      console.error('Error al eliminar el servicio de pago:', error);
      this.showErrorPopup('Ocurrió un error al eliminar el servicio de pago.');
    }
  });
}

  //  CERRAR POPUP
  cerrarPopup() {
    this.mostrarPopup = false;
    this.nuevaTarjeta = {};
    this.nuevoServicio = {};
    this.servicioSeleccionado = null;
    document.body.classList.remove('no-scroll'); // <-- También quitarlo aquí
  }

  // PRODUCTOS POR PAGAR
  //LOS MUERTOS DEL PRODUCTO QUE ME CAGO
  cartItems: CartItem[] = [];
  userId: number = 0;

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
  confirmPurchase(): void {
    const productos = this.cartItems;
    const metodo = this.paymentMethod();
  
    // Validaciones iniciales
    if (!productos.length) {
      alert('No hay productos en el carrito.');
      return;
    }
    if (!metodo) {
      alert('Selecciona un método de pago válido.');
      return;
    }
  
    // Crear el objeto de pedido
    const pedido = {
      productos,
      subtotal: this.calculateSubtotal(),
      envio: this.calculateShipping(),
      total: this.calculateTotal(),
      metodoPago: metodo,
    };
  
    console.log('Pedido confirmado:', pedido);
  
    // Debug: Imprimir el userId y el estado antes de enviarlos
    console.log('UserId:', this.userId);
    console.log('Nuevo estado:', 'Pagado');
  
    // Actualizar el estado de todos los productos del carrito a 'Pagado'
    this.cartService.updateCartStatus(this.userId, 'pagado').subscribe({
      next: () => {
        alert('¡Tu pedido ha sido procesado y marcado como Pagado!');
        this.loadCartItems(); // Recargar los productos del carrito para reflejar los cambios
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al actualizar el estado del carrito:', err);
        alert('Hubo un problema al procesar tu pedido.');
      },
    });
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

  //GLHF
  paymentMethod = signal<{ tipo: 'card' | 'servicio', valor: string } | null>(null);

  seleccionarMetodoDePago(tipo: 'card' | 'servicio', valor: string): void {
    this.paymentMethod.set({ tipo, valor });
  }
  
  // Total solo de precios, sin cantidades (no necesario si ya tienes calculateSubtotal)
  totalPrice = computed(() =>
    this.cartItems.reduce((sum, item) => sum + item.price, 0)
  );

  // Calcular el subtotal (precio * cantidad)
  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Calcular el costo de envío (ejemplo: gratis si el subtotal >= 500€)
  calculateShipping(): number {
    const subtotal = this.calculateSubtotal();
    return subtotal >= 500 ? 0 : 10;
  }

  // Calcular el total a pagar (subtotal + envío)
  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateShipping();
  }


}
