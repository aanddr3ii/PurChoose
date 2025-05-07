import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../services/paymentService/payment.service';

@Component({
  selector: 'app-metodos-pago-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './metodos-pago-component.component.html',
  styleUrls: ['./metodos-pago-component.component.css']
})
export class MetodosPagoComponentComponent implements OnInit {
  // Arrays donde se almacenarán las tarjetas y servicios de pago (obtenidos desde la API)
  metodosDePago: any[] = [];
  tarjetas: any[] = [];
  serviciosPago: any[] = [];

  // Estado del popup
  mostrarPopup = false;

  // Datos para edición/agregación de tarjetas
  nuevaTarjeta: {
    id_metodo?: number; // 👈 Aquí guardamos el ID real
    tipo?: string;
    nombre?: string;
    numero?: string;
    fechaExpiracion?: string;
    cvc?: string;
    index?: number;
  } = {};
  // Datos para edición/agregación de servicios
  nuevoServicio: {
    id_metodo?: number; // 👈 Aquí guardamos el ID real
    nombre?: string;
    email?: string;
    password?: string;
    index?: number;
  } = {};


  // Servicio seleccionado en el popup
  servicioSeleccionado: string | null = null;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadMetodosDePago();
  }

  loadMetodosDePago(): void {
    this.paymentService.getMetodosDePagoApi().subscribe({
      next: (data) => {
        this.metodosDePago = data;
        this.organizarMetodos();
      },
      error: (error) => {
        console.error('Error al cargar métodos de pago:', error);
        alert('Ocurrió un error al cargar tus métodos de pago.');
      }
    });
  }

private organizarMetodos(): void {
  this.tarjetas = this.metodosDePago
    .filter(m => m.tipo === 'tarjeta')
    .map(t => ({
      id_metodo: t.id_metodo,
      numero: t.num_tarjeta,
      tipo: t.tipo,
      nombre: t.nombre || 'Desconocido',
      fechaExpiracion: t.fecha_caducidad,
      cvc: t.codigo_validacion
    }));

  this.serviciosPago = this.metodosDePago
    .filter(s => ['paypal', 'apple_pay', 'google_pay'].includes(s.tipo))
    .map(s => ({
      id_metodo: s.id_metodo,
      nombre: s.tipo,
      email: s.email ?? ''
    }));
}

  // Método para agregar o editar una tarjeta - USANDO LA API
  agregarOEditarTarjeta(): void {
    const { tipo, numero, fechaExpiracion, cvc, index } = this.nuevaTarjeta;
  
    if (!tipo || !numero || !fechaExpiracion || !cvc) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    const numeroSanitizado = (numero ?? '').replace(/\s+/g, '');
  
    if (!/^\d{16}$/.test(numeroSanitizado)) {
      alert('El número de tarjeta debe tener 16 dígitos.');
      return;
    }
  
    if (!/^\d{3}$/.test(cvc)) {
      alert('El CVC debe tener exactamente 3 dígitos.');
      return;
    }
  
    // 👇 Enviamos 'tipo' como 'tarjeta' y 'nombre' como 'Visa', 'Mastercard', etc.
    this.paymentService.addOrUpdateTarjetaApi(
      {
        tipo: 'tarjeta', // 👈 SIEMPRE 'tarjeta'
        nombre: tipo, // 👈 'Visa', 'Mastercard', etc.
        numero: numeroSanitizado,
        fechaExpiracion,
        cvc
      },
      
      index
    ).subscribe({
      next: () => {
        alert('Tarjeta guardada exitosamente.');
        this.loadMetodosDePago();
        this.cerrarPopup();
      },
      error: (error) => {
        console.error('Error al guardar la tarjeta:', error);
        if (error.error && error.error.message) {
          alert(`Error: ${error.error.message}`);
        } else if (error.error && error.error.errors) {
          alert(`Errores: ${JSON.stringify(error.error.errors)}`);
        } else {
          alert('Ocurrió un error inesperado.');
        }
      }
    });
  }

  abrirPopupTarjeta(index?: number): void {
    this.mostrarPopup = true;
  
    if (index !== undefined && this.tarjetas[index]) {
      const tarjetaExistente = this.tarjetas[index];
      this.nuevaTarjeta = {
        ...tarjetaExistente,
        index // Esto es el índice local, NO el id_metodo
      };
    } else {
      this.nuevaTarjeta = {
        nombre: '', // Ej: 'Visa'
        numero: '',
        fechaExpiracion: '',
        cvc: '',
        index: undefined
      };
    }
  }

  eliminarTarjeta(index: number): void {
    const metodoId = this.tarjetas[index].id_metodo;

    this.paymentService.deleteMetodoDePagoApi(metodoId).subscribe({
      next: () => {
        alert('Tarjeta eliminada exitosamente.');
        this.loadMetodosDePago(); // Recargar desde la API
      },
      error: (error) => {
        console.error('Error al eliminar la tarjeta:', error);
        alert('Ocurrió un error al eliminar la tarjeta.');
      }
    });
  }

  agregarOEditarServicio(): void {
    const { nombre, email, password, index } = this.nuevoServicio;
  
    if (!nombre || !email) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
  
    const id_metodo = index !== undefined ? this.serviciosPago[index]?.id_metodo : undefined;
  
    const payload = {
      nombre,
      email,
      password
    };
  
    this.paymentService.addOrUpdateServicioApi(payload, id_metodo).subscribe({
      next: () => {
        alert('Servicio de pago guardado exitosamente.');
        this.loadMetodosDePago();
        this.cerrarPopup();
      },
      error: (error) => {
        console.error('Error al guardar el servicio:', error);
  
        if (error.status === 422 && error.error?.errors) {
          alert(`Errores:\n${JSON.stringify(error.error.errors, null, 2)}`);
        } else {
          alert('Ocurrió un error al guardar el servicio de pago.');
        }
      }
    });
  }

     abrirPopupServicio(nombre: string, index?: number): void {
  this.mostrarPopup = true;
  this.servicioSeleccionado = nombre;

  if (index !== undefined && this.serviciosPago[index]) {
    const servicioExistente = this.serviciosPago[index];

    this.nuevoServicio = {
      ...servicioExistente,
      index
    };
  } else {
    // 👇 No usamos 'index' aquí porque es solo el índice del array local
    const tipoCorrecto = nombre.toLowerCase().replace(' ', '_');
    this.nuevoServicio = {
      nombre: tipoCorrecto,
      email: '',
      password: '',
      index: undefined
    };
  }
}

  eliminarServicio(index: number): void {
    const metodoId = this.serviciosPago[index].id_metodo;

    this.paymentService.deleteMetodoDePagoApi(metodoId).subscribe({
      next: () => {
        alert('Servicio de pago eliminado exitosamente.');
        this.loadMetodosDePago(); // Recargar desde la API
      },
      error: (error) => {
        console.error('Error al eliminar el servicio de pago:', error);
        alert('Ocurrió un error al eliminar el servicio de pago.');
      }
    });
  }

  cerrarPopup(): void {
    this.mostrarPopup = false;
    this.nuevaTarjeta = {};
    this.nuevoServicio = {};
    this.servicioSeleccionado = null;
  }
}