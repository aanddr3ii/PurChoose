import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/paymentService/payment.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar [(ngModel)]

@Component({
  selector: 'app-metodos-pago-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './metodos-pago-component.component.html',
  styleUrls: ['./metodos-pago-component.component.css']
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
  }

  // Método para agregar o editar una tarjeta
  agregarOEditarTarjeta(): void {
    const { tipo, numero, fechaExpiracion, cvc, index } = this.nuevaTarjeta;

    if (!tipo || !numero || !fechaExpiracion || !cvc || cvc.length !== 3) {
      alert('Por favor, completa todos los campos correctamente. El CVC debe tener exactamente 3 dígitos.');
      return;
    }

    this.paymentService.addOrUpdateTarjeta({ tipo, numero, fechaExpiracion, cvc }, index).subscribe({
      next: () => {
        alert('Tarjeta guardada exitosamente.');
        this.loadTarjetas(); // Recargar desde el backend
        this.cerrarPopup();
      },
      error: (error) => {
        console.error('Error al guardar la tarjeta:', error);
        alert('Ocurrió un error al guardar la tarjeta.');
      }
    });
  }

  // Método para abrir el popup para tarjetas
  abrirPopupTarjeta(tipo?: string, index?: number): void {
    this.mostrarPopup = true;

    if (index !== undefined && this.tarjetas[index]) {
      // Si se proporciona un índice, estamos editando una tarjeta existente
      const tarjetaExistente = this.tarjetas[index];
      this.nuevaTarjeta = { ...tarjetaExistente, index };
    } else {
      // Si no se proporciona un índice, estamos agregando una nueva tarjeta
      this.nuevaTarjeta = { tipo: '', numero: '', fechaExpiracion: '', cvc: '', index: undefined };
    }
  }

  // Método para eliminar una tarjeta
  eliminarTarjeta(index: number): void {
    this.paymentService.deleteTarjeta(index).subscribe({
      next: () => {
        alert('Tarjeta eliminada exitosamente.');
        this.loadTarjetas(); // Recargar desde el backend
      },
      error: (error) => {
        console.error('Error al eliminar la tarjeta:', error);
        alert('Ocurrió un error al eliminar la tarjeta.');
      }
    });
  }

  // Método para agregar o editar un servicio de pago
  agregarOEditarServicio(): void {
    const { nombre, email, index } = this.nuevoServicio;

    if (!nombre || !email) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.paymentService.addOrUpdateServicio({ nombre, email }, index).subscribe({
      next: () => {
        alert('Servicio de pago guardado exitosamente.');
        this.loadServiciosPago(); // Recargar desde el backend
        this.cerrarPopup();
      },
      error: (error) => {
        console.error('Error al guardar el servicio de pago:', error);
        alert('Ocurrió un error al guardar el servicio de pago.');
      }
    });
  }

  // Método para abrir el popup para servicios de pago
  abrirPopupServicio(nombre: string, index?: number): void {
    this.mostrarPopup = true;
    this.servicioSeleccionado = nombre;

    if (index !== undefined && this.serviciosPago[index]) {
      // Si se proporciona un índice, estamos editando un servicio existente
      const servicioExistente = this.serviciosPago[index];
      this.nuevoServicio = { ...servicioExistente, index };
    } else {
      // Si no se proporciona un índice, estamos agregando un nuevo servicio
      this.nuevoServicio = { nombre, email: '', index: undefined };
    }
  }

  // Método para eliminar un servicio de pago
  eliminarServicio(index: number): void {
    this.paymentService.deleteServicio(index).subscribe({
      next: () => {
        alert('Servicio de pago eliminado exitosamente.');
        this.loadServiciosPago(); // Recargar desde el backend
      },
      error: (error) => {
        console.error('Error al eliminar el servicio de pago:', error);
        alert('Ocurrió un error al eliminar el servicio de pago.');
      }
    });
  }

  // Método para cerrar el popup
  cerrarPopup(): void {
    this.mostrarPopup = false;
    this.nuevaTarjeta = {};
    this.nuevoServicio = {};
    this.servicioSeleccionado = null;
  }
}