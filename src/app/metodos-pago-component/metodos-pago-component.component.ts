import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-metodos-pago-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './metodos-pago-component.component.html',
  styleUrl: './metodos-pago-component.component.css'
})
export class MetodosPagoComponentComponent {
  // Datos simulados de tarjetas bancarias
  tarjetas: { numero: string; tipo: string; fechaExpiracion: string }[] = [
    { numero: '**** **** **** 1234', tipo: 'Visa', fechaExpiracion: '12/25' },
    { numero: '**** **** **** 5678', tipo: 'Mastercard', fechaExpiracion: '03/26' }
  ];

  // Datos simulados de servicios de pago
  serviciosPago: { nombre: string; email: string }[] = [];

  // Formulario reactivo simple para agregar tarjetas
  nuevaTarjeta: { numero?: string; tipo?: string; fechaExpiracion?: string } = {};

  // Estado del popup de servicios de pago
  mostrarPopup = false;
  servicioSeleccionado: string | null = null;

  // Formulario reactivo simple para agregar servicios de pago
  nuevoServicio: { nombre?: string; email?: string } = {};

  // Método para agregar una nueva tarjeta
  agregarTarjeta() {
    if (this.nuevaTarjeta.numero && this.nuevaTarjeta.tipo && this.nuevaTarjeta.fechaExpiracion) {
      this.tarjetas.push({
        numero: `**** **** **** ${this.nuevaTarjeta.numero.slice(-4)}`,
        tipo: this.nuevaTarjeta.tipo,
        fechaExpiracion: this.nuevaTarjeta.fechaExpiracion
      });
      this.nuevaTarjeta = {};
      alert('Tarjeta agregada exitosamente.');
    } else {
      alert('Por favor, completa todos los campos de la tarjeta.');
    }
  }

  // Método para abrir el popup con el servicio seleccionado
  abrirPopup(servicio: string) {
    this.mostrarPopup = true;
    this.servicioSeleccionado = servicio; // Guardamos el servicio seleccionado
    this.nuevoServicio.email = ''; // Limpiamos el campo de correo electrónico
  }

  // Método para cerrar el popup
  cerrarPopup() {
    this.mostrarPopup = false;
    this.servicioSeleccionado = null; // Limpiamos el servicio seleccionado
    this.nuevoServicio.email = ''; // Limpiamos el campo de correo electrónico
  }

  // Método para agregar un nuevo servicio de pago
  agregarServicio() {
    if (this.servicioSeleccionado && this.nuevoServicio.email) {
      this.serviciosPago.push({
        nombre: this.servicioSeleccionado,
        email: this.nuevoServicio.email
      });
      this.cerrarPopup(); // Cerramos el popup después de agregar el servicio
      this.nuevoServicio = {}; // Limpiamos el formulario
      alert('Servicio de pago agregado exitosamente.');
    } else {
      alert('Por favor, selecciona un servicio y completa el correo electrónico.');
    }
  }

  // Método para eliminar una tarjeta
  eliminarTarjeta(index: number) {
    this.tarjetas.splice(index, 1);
    alert('Tarjeta eliminada exitosamente.');
  }

  // Método para eliminar un servicio de pago
  eliminarServicio(index: number) {
    this.serviciosPago.splice(index, 1);
    alert('Servicio de pago eliminado exitosamente.');
  }
}