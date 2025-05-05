import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrls } from '../../Shared/api-urls'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {}

  // Métodos para gestionar tarjetas

  getTarjetas(): Observable<{ numero: string; tipo: string; fechaExpiracion: string; cvc: string }[]> {
    const userId = 1; // Deberías obtenerlo dinámicamente
    return this.http.get<{ data: any[] }>(ApiUrls.METODOS_PAGO.GET_ALL(userId)).pipe(
      map(response => response.data.map(item => ({
        numero: item.numero,
        tipo: item.tipo,
        fechaExpiracion: item.fecha_caducidad,
        cvc: item.codigo_validacion
      })))
    );
  }

   // Método para agregar o actualizar tarjetas
   addOrUpdateTarjeta(
    payload: {
      tipo: string;
      numero: string;
      fechaExpiracion: string;
      cvc: string;
    },
    id?: number
  ): Observable<any> {
    const userId = 1; // Reemplazar con authService.getUserId()
    const metodoData = {
      user_id: userId,
      ...payload
    };

    if (id !== undefined) {
      return this.http.put(ApiUrls.METODOS_PAGO.UPDATE(id), metodoData);
    } else {
      return this.http.post(ApiUrls.METODOS_PAGO.CREATE, metodoData);
    }
  }

  deleteTarjeta(id: number): Observable<any> {
    return this.http.delete(ApiUrls.METODOS_PAGO.DELETE(id));
  }

  // Métodos para gestionar servicios de pago

  getServiciosPago(): Observable<{ nombre: string; email: string }[]> {
    const userId = 1;
    return this.http.get<{ data: any[] }>(ApiUrls.METODOS_PAGO.GET_ALL(userId)).pipe(
      map(response => response.data.map(item => ({
        nombre: item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1),
        email: item.email
      })))
    );
  }

    // Método para agregar o actualizar servicios de pago
    addOrUpdateServicio(
      servicio: { nombre: string; email: string },
      id?: number
    ): Observable<any> {
      const userId = 1; // Reemplazar con authService.getUserId()
      const metodoData = {
        user_id: userId,
        tipo: servicio.nombre.toLowerCase(),
        email: servicio.email
      };
  
      if (id !== undefined) {
        return this.http.put(ApiUrls.METODOS_PAGO.UPDATE(id), metodoData);
      } else {
        return this.http.post(ApiUrls.METODOS_PAGO.CREATE, metodoData);
      }
    }

 // Método para eliminar un servicio de pago
 deleteServicio(id: number): Observable<any> {
  return this.http.delete(ApiUrls.METODOS_PAGO.DELETE(id));
}

  async servicioYaExiste(nombre: string): Promise<boolean> {
    try {
      const servicios = await this.getServiciosPago().toPromise();
      return servicios?.some(servicio => servicio.nombre === nombre) || false;
    } catch {
      return false;
    }
  }
}