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
    this.tarjetas = this.paymentService.getTarjetas();
    this.serviciosPago = this.paymentService.getServiciosPago();
    this.user = this.userService.getUser();
          this.userId = this.authService.getUserId();
  
      if (!this.userId) {
        console.error('Usuario no autenticado');
        alert('Debes iniciar sesión para ver tu carrito.');
        return;
      }
  
      this.loadCartItems();

    this.editForm = this.fb.group({
      name: [this.user.name, Validators.required],
      location: [this.user.ubicacion || '', Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      prefijo: ['+34', Validators.required],
      phone: [
        this.user.telefono?.toString().slice(3) || null,
        [Validators.required, Validators.pattern(/^\d{9}$/)]
      ],
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

  // TARJETAS
  agregarOEditarTarjeta() {
    const { tipo, numero, fechaExpiracion, cvc, index } = this.nuevaTarjeta;

    if (!tipo || !numero || !fechaExpiracion || !cvc || cvc.length !== 3) {
      alert('Por favor, completa todos los campos correctamente. El CVC debe tener exactamente 3 dígitos.');
      return;
    }

    this.paymentService.addOrUpdateTarjeta({ tipo, numero, fechaExpiracion, cvc }, index);
    this.tarjetas = this.paymentService.getTarjetas();
    this.cerrarPopup();
  }

  abrirPopupTarjeta(tipo?: string, index?: number) {
    this.mostrarPopup = true;

    if (index !== undefined) {
      const tarjetaExistente = this.tarjetas[index];
      this.nuevaTarjeta = { ...tarjetaExistente, index };
    } else {
      this.nuevaTarjeta = { tipo: '', numero: '', fechaExpiracion: '', cvc: '', index: undefined };
    }
  }

  eliminarTarjeta(index: number) {
    this.paymentService.deleteTarjeta(index);
    this.tarjetas = this.paymentService.getTarjetas();
  }

  // SERVICIOS DE PAGO
  agregarOEditarServicio() {
    const { nombre, email, index } = this.nuevoServicio;

    if (!nombre || !email) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.paymentService.addOrUpdateServicio({ nombre, email }, index);
    this.serviciosPago = this.paymentService.getServiciosPago();
    this.cerrarPopup();
  }

  abrirPopupServicio(nombre: string, index?: number) {
    this.mostrarPopup = true;
    this.servicioSeleccionado = nombre;

    if (index !== undefined) {
      const servicioExistente = this.serviciosPago[index];
      this.nuevoServicio = { ...servicioExistente, index };
    } else {
      this.nuevoServicio = { nombre, email: '', index: undefined };
    }
  }

  eliminarServicio(index: number) {
    this.paymentService.deleteServicio(index);
    this.serviciosPago = this.paymentService.getServiciosPago();
  }

  //  CERRAR POPUP
  cerrarPopup() {
    this.mostrarPopup = false;
    this.nuevaTarjeta = {};
    this.nuevoServicio = {};
    this.servicioSeleccionado = null;
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
  
  // Confirmar compra
  confirmPurchase(): void {
    const productos = this.cartItems;
    const metodo = this.paymentMethod();
  
    if (!productos.length) {
      alert('No hay productos en el carrito.');
      return;
    }
  
    if (!metodo) {
      alert('Selecciona un método de pago válido.');
      return;
    }
  
    const pedido = {
      productos,
      subtotal: this.calculateSubtotal(),
      envio: this.calculateShipping(),
      total: this.calculateTotal(),
      metodoPago: metodo
    };
  
    console.log('Pedido confirmado:', pedido);
  
    const deleteRequests = productos.map(item =>
      this.cartService.removeCartItem(item.id).pipe(
        catchError((err: unknown) => {
          console.error(`Error eliminando producto ID ${item.id}:`, err);
          return of(null);
        })
      )
    );
  
    forkJoin(deleteRequests).subscribe({
      next: () => {
        alert('¡Tu pedido ha sido procesado!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al vaciar el carrito:', err);
        alert('Hubo un problema al procesar tu pedido.');
      }
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
