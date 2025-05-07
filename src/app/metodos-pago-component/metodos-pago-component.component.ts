import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../services/paymentService/payment.service';

@Component({
  selector: 'app-metodos-pago-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './metodos-pago-component.component.html',
  styleUrl: './metodos-pago-component.component.css'
})
export class MetodosPagoComponentComponent implements OnInit {
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

constructor(private paymentService: PaymentService) {}

ngOnInit(): void {
  // Cargamos los datos desde el servicio
  this.tarjetas = this.paymentService.getTarjetas();
  this.serviciosPago = this.paymentService.getServiciosPago();
}

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
}