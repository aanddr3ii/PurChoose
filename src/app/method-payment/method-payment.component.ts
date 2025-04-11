import { Component, OnInit } from '@angular/core';
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from '../services/paymentService/payment.service';
import { User } from '../interfaces/user';
import { UserService } from '../services/userService/user.service';

import { NgModule } from '@angular/core';
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
// Datos de tarjetas y servicios de pago
tarjetas: { numero: string; tipo: string; fechaExpiracion: string; cvc: string }[] = [];
serviciosPago: { nombre: string; email: string }[] = [];

// Estado del popup
mostrarPopup = false;

// Datos para edición/agregación de tarjetas
nuevaTarjeta: { tipo?: string; numero?: string; fechaExpiracion?: string; cvc?: string; index?: number } = {};

// Datos para edición/agregación de servicios
nuevoServicio: { nombre?: string; email?: string; index?: number } = {};

// Servicio seleccionado en el popup
servicioSeleccionado: string | null = null;

constructor(private paymentService: PaymentService, private fb: FormBuilder, private userService: UserService) {}

// Método para agregar o editar una tarjeta
agregarOEditarTarjeta() {
  const { tipo, numero, fechaExpiracion, cvc, index } = this.nuevaTarjeta;

  if (!tipo || !numero || !fechaExpiracion || !cvc || cvc.length !== 3) {
    alert('Por favor, completa todos los campos correctamente. El CVC debe tener exactamente 3 dígitos.');
    return;
  }

  this.paymentService.addOrUpdateTarjeta({ tipo, numero, fechaExpiracion, cvc }, index);
  this.tarjetas = this.paymentService.getTarjetas(); // Actualizamos la lista local
  this.cerrarPopup();
}

// Método para abrir el popup para tarjetas
abrirPopupTarjeta(tipo?: string, index?: number) {
  this.mostrarPopup = true;

  if (index !== undefined) {
    // Si se proporciona un índice, estamos editando una tarjeta existente
    const tarjetaExistente = this.tarjetas[index];
    this.nuevaTarjeta = { ...tarjetaExistente, index }; // Cargamos los datos actuales
  } else {
    // Si no se proporciona un índice, estamos agregando una nueva tarjeta
    this.nuevaTarjeta = { tipo: '', numero: '', fechaExpiracion: '', cvc: '', index: undefined };
  }
}

// Método para eliminar una tarjeta
eliminarTarjeta(index: number) {
  this.paymentService.deleteTarjeta(index);
  this.tarjetas = this.paymentService.getTarjetas(); // Actualizamos la lista local
}

// Método para agregar o editar un servicio de pago
agregarOEditarServicio() {
  const { nombre, email, index } = this.nuevoServicio;

  if (!nombre || !email) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  this.paymentService.addOrUpdateServicio({ nombre, email }, index);
  this.serviciosPago = this.paymentService.getServiciosPago(); // Actualizamos la lista local
  this.cerrarPopup();
}

// Método para abrir el popup para servicios de pago
abrirPopupServicio(nombre: string, index?: number) {
  this.mostrarPopup = true;
  this.servicioSeleccionado = nombre;

  if (index !== undefined) {
    // Si se proporciona un índice, estamos editando un servicio existente
    const servicioExistente = this.serviciosPago[index];
    this.nuevoServicio = { ...servicioExistente, index }; // Cargamos los datos actuales
  } else {
    // Si no se proporciona un índice, estamos agregando un nuevo servicio
    this.nuevoServicio = { nombre, email: '', index: undefined };
  }
}

// Método para eliminar un servicio de pago
eliminarServicio(index: number) {
  this.paymentService.deleteServicio(index);
  this.serviciosPago = this.paymentService.getServiciosPago(); // Actualizamos la lista local
}

// Método para cerrar el popup
cerrarPopup() {
  this.mostrarPopup = false;
  this.nuevaTarjeta = {}; // Limpiamos el formulario de tarjetas
  this.nuevoServicio = {}; // Limpiamos el formulario de servicios
  this.servicioSeleccionado = null; // Limpiamos el servicio seleccionado
}

///////////////////////////////////////
///////////////////////////////////////
prefixes = [
  { value: '+1', flag: '🇺🇸' },
  { value: '+351', flag: '🇵🇹' },
  { value: '+33', flag: '🇫🇷' },
  { value: '+34', flag: '🇪🇸' },
]; // Lista de prefijos telefónicos

ngOnInit(): void {
  // Cargamos los datos desde el servicio
  this.tarjetas = this.paymentService.getTarjetas();
  this.serviciosPago = this.paymentService.getServiciosPago();3

  this.user = this.userService.getUser(); // Obtenemos el usuario actual desde el servicio

    // Inicializamos el formulario con los datos actuales del usuario
    this.editForm = this.fb.group({
      name: [this.user.name, Validators.required], // Campo obligatorio
      location: [this.user.ubicacion || '', Validators.required], // Ubicación (obligatoria)
      email: [this.user.email, [Validators.required, Validators.email]], // Email (obligatorio)
      prefijo: ['+34', Validators.required], // Prefijo telefónico con validación
      phone: [this.user.telefono?.toString().slice(3) || null, [Validators.required, Validators.pattern(/^\d{9}$/)]], // Teléfono sin prefijo
    });

    // Validación condicional para password_confirmation
    this.editForm.get('password')?.valueChanges.subscribe((value) => {
      if (value) {
        this.editForm.get('password_confirmation')?.setValidators([Validators.required]);
      } else {
        this.editForm.get('password_confirmation')?.clearValidators();
      }
      this.editForm.get('password_confirmation')?.updateValueAndValidity();
    });
}
/* User ubi */

editForm!: FormGroup; // Formulario reactivo
user!: User; // Propiedad para almacenar el usuario actual

  // Método para guardar los cambios
  onSubmit(): void {
    if (this.editForm.valid) {
      // Verificamos que el ID del usuario exista
      if (!this.user.id) {
        this.showErrorPopup('Error: No se encontró el ID del usuario.');
        return;
      }

      const formValues = this.editForm.value;

      // Construir el objeto JSON con los datos a enviar
      const updatedUserData = {
        name: formValues.name,
        email: formValues.email,
        prefijo: formValues.prefijo,
        telefono: formValues.phone ? `${formValues.prefijo}${formValues.phone}` : null, // Concatenar prefijo y teléfono
        ubicacion: formValues.location,
      };

      console.log('Datos enviados al backend:', updatedUserData);

      // Enviamos los datos al backend como JSON
      this.userService.editUserInApi(this.user.id, updatedUserData).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);

          // Actualizar el usuario actual en localStorage
          const updatedUser = response.user; // Asegúrate de que el backend devuelve los datos actualizados
          this.userService.updateCurrentUser(updatedUser);

          // Mostrar mensaje de éxito
          this.showSuccessPopup('¡Cambios guardados exitosamente!');
        },
        error: (error) => {
          console.error('Error al actualizar el perfil:', error);
          if (error.error && error.error.message) {
            this.showErrorPopup(error.error.message); // Mostrar mensaje detallado del backend
          } else {
            this.showErrorPopup('Ocurrió un error inesperado.');
          }
        },
      });
    } else {
      this.showErrorPopup('Por favor, completa todos los campos obligatorios.');
    }
  }

  // Método para mostrar un popup de éxito
  showSuccessPopup(message: string): void {
    alert(message); // Puedes reemplazar esto con un componente de popup personalizado
  }

  // Método para mostrar un popup de error
  showErrorPopup(message: string): void {
    alert(message); // Puedes reemplazar esto con un componente de popup personalizado
  }

}
