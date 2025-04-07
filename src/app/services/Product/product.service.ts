import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../interfaces/product';
import { ApiUrls } from '../../Shared/api-urls'; // Importa las URLs de la API

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los productos disponibles.
   * @returns Un Observable que emite una lista de productos.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(ApiUrls.PRODUCTOS.LIST).pipe(
      catchError((error) => {
        console.error('Error al obtener los productos:', error);
        return throwError(() => new Error('No se pudieron cargar los productos.'));
      })
    );
  }

  /**
   * Filtra productos por una lista de IDs de categorías.
   * @param categoryIds Array de IDs de categorías.
   * @returns Un Observable que emite una lista de productos filtrados.
   */
  getProductsByCategories(categoryIds: number[]): Observable<Product[]> {
    console.log('Filtrando productos por categorías:', categoryIds); // Debugging
    return this.http.post<Product[]>(ApiUrls.PRODUCTOS.FILTRAR, { categorias: categoryIds }).pipe(
      catchError((error) => {
        console.error('Error al filtrar productos por categorías:', error);
        return throwError(() => new Error('No se pudieron filtrar los productos.'));
      })
    );
  }

  /**
   * Obtiene un producto específico por su ID.
   * @param productId ID del producto.
   * @returns Un Observable que emite el producto solicitado.
   */
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${ApiUrls.PRODUCTOS.LIST}/${productId}`).pipe(
      catchError((error) => {
        console.error('Error al obtener el producto:', error);
        return throwError(() => new Error('No se pudo cargar el producto.'));
      })
    );
  }

  /**
   * Crea un nuevo producto.
   * @param productData Datos del producto a crear.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  addProduct(productData: any): Observable<any> {
    return this.http.post(ApiUrls.PRODUCTOS.STORE, productData).pipe(
      catchError((error) => {
        console.error('Error al crear el producto:', error);
        return throwError(() => new Error('No se pudo crear el producto.'));
      })
    );
  }

  /**
   * Actualiza un producto existente.
   * @param productId ID del producto a actualizar.
   * @param updatedData Datos actualizados del producto.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  updateProduct(productId: number, updatedData: any): Observable<any> {
    return this.http.put(`${ApiUrls.PRODUCTOS.LIST}/${productId}`, updatedData).pipe(
      catchError((error) => {
        console.error('Error al actualizar el producto:', error);
        return throwError(() => new Error('No se pudo actualizar el producto.'));
      })
    );
  }

  /**
   * Elimina un producto existente.
   * @param productId ID del producto a eliminar.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${ApiUrls.PRODUCTOS.LIST}/${productId}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar el producto:', error);
        return throwError(() => new Error('No se pudo eliminar el producto.'));
      })
    );
  }
}