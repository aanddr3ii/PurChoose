import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiUrls } from '../../Shared/api-urls'; // Importa las URLs de la API
import { CartItem } from '../../interfaces/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartItems(userId: number): Observable<CartItem[]> {
    const url = ApiUrls.CARRITO.GET(userId); // Genera la URL dinámica
    console.log('URL generada para GET:', url); // Depuración: Imprime la URL
  
    return this.http.get<any[]>(url).pipe(
      catchError((error) => {
        console.error('Error al obtener los productos del carrito:', error);
        return throwError(() => new Error('No se pudieron cargar los productos del carrito.'));
      }),
      map((items) =>
        items.map((item) => ({
          ...item,
          price: Number(item.producto?.precio) || 0, // Obtiene el precio del producto
          status: item.estado || 'No pagado',       // Usa 'estado' del backend
          quantity: item.cantidad || 1,            // Usa 'cantidad' del backend
          productDetails: item.producto || null,   // Asigna los detalles del producto
        }))
      )
    );
  }

  addToCart(userId: number, productId: number, quantity: number = 1): Observable<any> {
    const url = ApiUrls.CARRITO.ADD; // URL para añadir al carrito
    console.log('URL generada para POST:', url); // Depuración: Imprime la URL
  
    const body = {
      user_id: userId,
      producto_id: productId,
      cantidad: quantity,
    };
  
    console.log('Datos enviados:', body); // Depuración: Imprime los datos enviados
  
    return this.http.post(url, body).pipe(
      catchError((error) => {
        console.error('Error al añadir el producto al carrito:', error);
        return throwError(() => new Error('No se pudo añadir el producto al carrito.'));
      })
    );
  }

  updateCartItem(cartItemId: number, updates: Partial<CartItem>): Observable<any> {
    const url = ApiUrls.CARRITO.UPDATE(cartItemId); // URL dinámica para actualizar el carrito
    console.log('URL generada para PUT:', url); // Depuración: Imprime la URL
    console.log('Datos enviados al backend:', updates); // Depuración: Imprime los datos enviados
  
    return this.http.put(url, updates).pipe(
      catchError((error) => {
        console.error('Error al actualizar el producto del carrito:', error);
        return throwError(() => new Error('No se pudo actualizar el producto del carrito.'));
      })
    );
  }

  removeCartItem(cartItemId: number): Observable<any> {
    const url = ApiUrls.CARRITO.DELETE(cartItemId); // Genera la URL dinámica
    console.log('URL generada para DELETE:', url); // Depuración: Imprime la URL

    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error('Error al eliminar el producto del carrito:', error);
        return throwError(() => new Error('No se pudo eliminar el producto del carrito.'));
      })
    );
  }

  updateCartStatus(userId: number, newStatus: 'pagado' | 'no pagado' | 'recibido' | 'enviado' | 'cancelado'): Observable<any> {
    const url = `${ApiUrls.CARRITO.UPDATE(userId)}`;
    
    // Construir el objeto JSON con los datos a enviar
    const payload = { estado: newStatus };
  
    // Debug: Imprimir los datos que se enviarán
    console.log('URL generada:', url);
    console.log('Datos enviados al backend:', payload);
  
    // Enviamos los datos al backend como JSON
    return this.http.put(url, payload, { headers: { 'Content-Type': 'application/json' } });
  }
}