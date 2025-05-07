import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiUrls } from '../../Shared/api-urls'; // Asegúrate de que la ruta sea correcta
import { AuthService } from '../authService/auth.service'; // Ajusta esta ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // Datos simulados de tarjetas bancarias
  private tarjetas: { numero: string; tipo: string; fechaExpiracion: string; cvc: string }[] = [];

  // Datos simulados de servicios de pago
  private serviciosPago: { nombre: string; email: string }[] = [];

  constructor(private http: HttpClient,    private authService: AuthService
  ) {
    this.tarjetas = [ 
      { numero: '**** **** **** 1234', tipo: 'Visa', fechaExpiracion: '12/25', cvc: '123' },
      { numero: '**** **** **** 5678', tipo: 'Mastercard', fechaExpiracion: '03/26', cvc: '456' }
    ];

    this.serviciosPago = [
      { nombre: 'PayPal', email: 'usuario@paypal.com' },
      { nombre: 'Stripe', email: 'usuario@stripe.com' }
    ];
  }

  // Métodos para gestionar tarjetas - DATOS SIMULADOS

  getTarjetas(): { numero: string; tipo: string; fechaExpiracion: string; cvc: string }[] {
    return this.tarjetas;
  }

  addOrUpdateTarjeta(tarjeta: { tipo: string; numero: string; fechaExpiracion: string; cvc: string }, index?: number): void {
    if (index !== undefined) {
      this.tarjetas[index] = tarjeta;
    } else {
      this.tarjetas.push(tarjeta);
    }
    alert('Tarjeta guardada exitosamente.');
  }

  deleteTarjeta(index: number): void {
    this.tarjetas.splice(index, 1);
    alert('Tarjeta eliminada exitosamente.');
  }

  // Métodos para gestionar servicios de pago - DATOS SIMULADOS

  getServiciosPago(): { nombre: string; email: string }[] {
    return this.serviciosPago;
  }

  addOrUpdateServicio(servicio: { nombre: string; email: string }, index?: number): void {
    if (index !== undefined) {
      this.serviciosPago[index] = servicio;
    } else {
      if (this.servicioYaExiste(servicio.nombre)) {
        alert('Este servicio ya está registrado.');
        return;
      }
      this.serviciosPago.push(servicio);
    }
    alert('Servicio de pago guardado exitosamente.');
  }

  deleteServicio(index: number): void {
    this.serviciosPago.splice(index, 1);
    alert('Servicio de pago eliminado exitosamente.');
  }

  servicioYaExiste(nombre: string): boolean {
    return this.serviciosPago.some((servicio) => servicio.nombre === nombre);
  }
//----------------------------------------------------------------------------------------------------------------------------------------
  // ✅ Nuevas funciones para interactuar con la API

  // 🔹 OBTENER TODOS LOS MÉTODOS DE PAGO DEL USUARIO (tarjetas + servicios)
  getMetodosDePagoApi(): Observable<any[]> {
    const userId = this.authService.getUserId(); // 👈 Aquí obtenemos el ID del usuario autenticado
    return this.http.get(`${ApiUrls.METODOS_PAGO.GET_ALL(userId)}`).pipe(
      map((response: any) => response.data || []),
      catchError(() => of([]))
    );
  }

  // 🔹 OBTENER SOLO LAS TARJETAS DEL USUARIO
  getTarjetasApi(): Observable<{ id_metodo: number; numero: string; tipo: string; nombre: string; fechaExpiracion: string; cvc: string }[]> {
  const userId = this.authService.getUserId();
  return this.http.get(ApiUrls.METODOS_PAGO.GET_ALL(userId)).pipe(
    map((response: any) => {
      if (Array.isArray(response.data)) {
        return response.data
          .filter((item: any) => item.tipo === 'tarjeta')
          .map((item: any) => ({
            id_metodo: item.id_metodo,
            numero: item.num_tarjeta,
            tipo: item.tipo,
            nombre: item.nombre || 'Desconocido',
            fechaExpiracion: item.fecha_caducidad,
            cvc: item.codigo_validacion
          }));
      }
      return [];
    }),
    catchError(() => of([]))
  );
}

  // 🔹 AGREGAR O ACTUALIZAR UNA TARJETA
  addOrUpdateTarjetaApi(
    tarjeta: {
      tipo: string;
      nombre: string;
      numero: string;
      fechaExpiracion: string;
      cvc: string;
    },
    
    id_metodo?: number // 👈 Renombramos el parámetro para que sea claro
    
  ): Observable<any> {
    const userId = this.authService.getUserId();
    const payload = {
      user_id: userId,
      tipo: tarjeta.tipo,
      nombre: tarjeta.nombre,
      num_tarjeta: tarjeta.numero,
      fecha_caducidad: tarjeta.fechaExpiracion,
      codigo_validacion: tarjeta.cvc
    };
  
    console.log('Datos enviados al backend:', payload);
    console.log('ID del método:', id_metodo); // 👈 Ahora sí es el ID real
  
    if (id_metodo !== undefined && id_metodo > 0) {
      return this.http.put(ApiUrls.METODOS_PAGO.UPDATE(id_metodo), payload);
    } else {
      return this.http.post(ApiUrls.METODOS_PAGO.CREATE, payload);
    }
  }
  
  // 🔹 ELIMINAR TARJETA POR ID
  deleteTarjetaApi(id: number): Observable<any> {
    return this.http.delete(ApiUrls.METODOS_PAGO.DELETE(id));
  }

  // 🔹 OBTENER SERVICIOS DE PAGO DEL USUARIO
  getServiciosPagoApi(): Observable<{ nombre: string; email: string }[]> {
    const userId = this.authService.getUserId();
    return this.http.get(ApiUrls.METODOS_PAGO.GET_ALL(userId)).pipe(
      map((response: any) => {
        if (Array.isArray(response.data)) {
          return response.data
            .filter((item: any) => ['paypal', 'apple_pay', 'google_pay'].includes(item.tipo))
            .map((item: any) => ({
              nombre: item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1),
              email: item.email
            }));
        }
        return [];
      }),
      catchError(() => of([]))
    );
  }

  // 🔹 AGREGAR O ACTUALIZAR UN SERVICIO DE PAGO
  addOrUpdateServicioApi(
  servicio: {
    nombre: string;
    email: string;
    password?: string;
  },
  id_metodo?: number // 👈 Mismo cambio aquí
): Observable<any> {
  const userId = this.authService.getUserId();
  const payload = {
    user_id: userId,
    tipo: servicio.nombre.toLowerCase(),
    email: servicio.email,
    password: servicio.password
  };

  console.log('Datos enviados al backend:', payload);
  console.log('ID del método:', id_metodo); // 👈 Ahora es claro

  if (id_metodo !== undefined && id_metodo > 0) {
    return this.http.put(ApiUrls.METODOS_PAGO.UPDATE(id_metodo), payload);
  } else {
    return this.http.post(ApiUrls.METODOS_PAGO.CREATE, payload);
  }
}

  // 🔹 ELIMINAR UN SERVICIO DE PAGO
  deleteMetodoDePagoApi(id: number): Observable<any> {
    return this.http.delete(ApiUrls.METODOS_PAGO.DELETE(id));
  }
}