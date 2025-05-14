import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiUrls } from '../../Shared/api-urls'; // Importa las URLs de la API

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los detalles de un producto específico.
   * @param productId ID del producto.
   * @returns Un Observable que emite los detalles del producto.
   */
  getProductDetails(productId: number): Observable<any> {
    return this.http.get<any>(`${ApiUrls.PRODUCTOS.LIST}/${productId}/detalles`).pipe(
      catchError((error) => {
        console.error('Error al obtener los detalles del producto:', error);
        return throwError(() => new Error('No se pudieron cargar los detalles del producto.'));
      })
    );
  }

  /**
   * Obtiene el nombre del usuario propietario de un producto específico.
   * @param productId ID del producto.
   * @returns Un Observable que emite el nombre del usuario propietario.
   */
  getUserName(productId: number): Observable<string> {
    return this.getProductDetails(productId).pipe(
      switchMap((product) => {
        const userId = product.user_id;
        if (!userId || userId === 0) {
          throw new Error('ID de usuario no válido.');
        }
        const url = ApiUrls.USUARIO.SHOW(userId); // Usa el endpoint USUARIO.SHOW
        console.log('Realizando solicitud GET a:', url); // Log para depuración
        return this.http.get<any>(url).pipe(
          map((userData) => {
            console.log('Datos recibidos del backend:', userData); // Log para depuración
            // Accede al campo 'name' dentro del objeto 'user'
            return userData.user?.name || 'Usuario desconocido';
          }),
          catchError((error) => {
            console.error('Error al obtener el nombre del usuario:', error);
            return throwError(() => new Error('No se pudo cargar el nombre del usuario.'));
          })
        );
      }),
      catchError((error) => {
        console.error('Error al obtener el nombre del usuario:', error);
        return throwError(() => new Error('No se pudo cargar el nombre del usuario.'));
      })
    );
  }
  // NUEVO: Obtener ID del propietario del producto
getProductOwnerId(productId: number): Observable<number> {
  return this.http.get<any>(`${ApiUrls.PRODUCTOS.LIST}/${productId}`).pipe(
    map(response => {
      const userId = response.user_id;
      if (!userId || userId === 0) {
        throw new Error('Producto sin dueño');
      }
      return userId;
    }),
    catchError(err => {
      console.error('Error al obtener el owner:', err);
      return throwError(() => new Error('No se pudo obtener el propietario'));
    })
  );
}
  getProductLocation(productId: number): Observable<string> {
    return this.getProductDetails(productId).pipe(
      map((product) => {
        console.log('Detalles del producto recibidos:', product); // Log para depuración
        return product.ubicacion || 'Ubicación desconocida';
      }),
      catchError((error) => {
        console.error('Error al obtener la ubicación del producto:', error);
        return throwError(() => new Error('No se pudo cargar la ubicación del producto.'));
      })
    );
  }
}
