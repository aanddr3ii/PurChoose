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
    id_metodo?: number; // 👈 Guardamos el ID real del backend
    tipo?: string;
    nombre?: string;
    numero?: string;
    fechaExpiracion?: string;
    cvc?: string;
    index?: number; // Índice local del array (no es el id_metodo)
  } = {};

  // Datos para edición/agregación de servicios
  nuevoServicio: {
    id_metodo?: number;
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
    console.log('Datos del formulario (nuevaTarjeta):', this.nuevaTarjeta);
  
    const { tipo, numero, fechaExpiracion, cvc, index } = this.nuevaTarjeta;
  
    if (!tipo || !numero || !fechaExpiracion || !cvc) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    const numeroSanitizado = (numero ?? '').replace(/\s+/g, '');
  
    if (!/^\d{16}$/.test(numeroSanitizado)) {
      alert('El número debe tener 16 dígitos.');
      return;
    }
  
    if (!/^\d{3}$/.test(cvc)) {
      alert('El CVC debe tener exactamente 3 dígitos.');
      return;
    }
  
    const payload = {
      tipo: 'tarjeta',
      nombre: tipo,
      numero: numeroSanitizado,
      fechaExpiracion,
      cvc
    };
  
    console.log('Payload enviado al servicio:', payload);
    console.log('ID del método:', index);
  
    this.paymentService.addOrUpdateTarjetaApi(payload, index).subscribe({
      next: () => {
        alert('Tarjeta guardada exitosamente.');
        this.loadMetodosDePago();
        this.cerrarPopup();
      },
      error: (error) => {
        console.error('Error al guardar la tarjeta:', error);
        alert('Ocurrió un error al guardar la tarjeta.');
      }
    });
  }
  // ✅ Corrección AQUÍ: ahora usamos index para obtener el id_metodo del array local
  abrirPopupTarjeta(index?: number): void {
    this.mostrarPopup = true;
  
    if (index !== undefined && this.tarjetas[index]) {
      const tarjetaExistente = this.tarjetas[index];
  
      this.nuevaTarjeta = {
        ...tarjetaExistente,
        index: tarjetaExistente.id_metodo
      };
      
      // ✅ Imprime la tarjeta que estás cargando
      console.log('Tarjeta cargada para editar:', this.nuevaTarjeta);
    } else {
      this.nuevaTarjeta = {
        tipo: '',
        nombre: '',
        numero: '',
        fechaExpiracion: '',
        cvc: ''
      };
    }
  
    document.body.classList.add('no-scroll');
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

  // Este método YA FUNCIONA BIEN, lo dejamos como está
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

  // Este método YA FUNCIONA BIEN, lo dejamos como está
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