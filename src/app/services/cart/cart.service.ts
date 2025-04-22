import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiUrls } from '../../Shared/api-urls'; // Importa las URLs de la API
import { Product } from '../../interfaces/product';
import { CartItem } from '../../interfaces/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los productos del carrito de un usuario específico.
   * @param userId ID del usuario.
   * @returns Un Observable que emite los productos del carrito.
   */
  getCartItems(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${ApiUrls.CARRITO.GET}/${userId}`).pipe(
      catchError((error) => {
        console.error('Error al obtener los productos del carrito:', error);
        return throwError(() => new Error('No se pudieron cargar los productos del carrito.'));
      }),
      map((items) =>
        items.map((item) => ({
          ...item,
          price: Number(item.product?.precio) || 0,
          status: item.status || 'No pagado',
          quantity: item.quantity || 1,
        }))
      )
    );
  }


  addToCart(userId: number, productId: number, quantity: number = 1): Observable<any> {
    const body = {
      user_id: userId,
      producto_id: productId,
      cantidad: quantity,
    };

    return this.http.post(`${ApiUrls.CARRITO.ADD}`, body).pipe(
      catchError((error) => {
        console.error('Error al añadir el producto al carrito:', error);
        return throwError(() => new Error('No se pudo añadir el producto al carrito.'));
      })
    );
  }

  /**
   * Actualiza la cantidad o el estado de un producto en el carrito.
   * @param cartItemId ID del item del carrito.
   * @param updates Datos a actualizar (cantidad o estado).
   * @returns Un Observable que emite la respuesta del servidor.
   */
  updateCartItem(cartItemId: number, updates: Partial<CartItem>): Observable<any> {
    return this.http.put(`${ApiUrls.CARRITO.UPDATE}/${cartItemId}`, updates).pipe(
      catchError((error) => {
        console.error('Error al actualizar el producto del carrito:', error);
        return throwError(() => new Error('No se pudo actualizar el producto del carrito.'));
      })
    );
  }

  /**
   * Cambia el estado de un producto en el carrito.
   * @param cartItemId ID del item del carrito.
   * @param newStatus Nuevo estado del producto.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  changeStatus(cartItemId: number, newStatus: 'No pagado' | 'Pagado' | 'Enviado' | 'Recibido'): Observable<any> {
    return this.updateCartItem(cartItemId, { status: newStatus });
  }

  /**
   * Elimina un producto del carrito.
   * @param cartItemId ID del item del carrito.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  removeCartItem(cartItemId: number): Observable<any> {
    return this.http.delete(`${ApiUrls.CARRITO.DELETE}/${cartItemId}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar el producto del carrito:', error);
        return throwError(() => new Error('No se pudo eliminar el producto del carrito.'));
      })
    );
  }
}