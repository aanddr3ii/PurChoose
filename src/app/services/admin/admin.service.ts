import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiUrls } from '../../Shared/api-urls'; // Ajusta la ruta según corresponda

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  // === USUARIOS ===

  /**
   * Obtener todos los usuarios
   */
  getAllUsers(): Observable<any> {
    return this.http.get(ApiUrls.ADMIN.USUARIOS)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtener usuario por ID
   * @param id ID del usuario
   */
  getUserById(id: number): Observable<any> {
    return this.http.get(ApiUrls.ADMIN.USUARIO(id))
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Crear un nuevo usuario
   * @param data Datos del usuario
   */
  createUser(data: any): Observable<any> {
    return this.http.post(ApiUrls.ADMIN.USUARIOS, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Actualizar usuario
   * @param id ID del usuario
   * @param data Datos actualizados
   */
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(ApiUrls.ADMIN.USUARIO(id), data)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Eliminar usuario
   * @param id ID del usuario
   */
  deleteUser(id: number): Observable<any> {
    return this.http.delete(ApiUrls.ADMIN.USUARIO(id))
      .pipe(
        catchError(this.handleError)
      );
  }

  // === CATEGORÍAS ===

  /**
   * Obtener todas las categorías
   */
  getAllCategories(): Observable<any> {
    return this.http.get(ApiUrls.ADMIN.CATEGORIAS)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtener categoría por ID
   * @param id ID de la categoría
   */
  getCategoryById(id: number): Observable<any> {
    return this.http.get(ApiUrls.ADMIN.CATEGORIA(id))
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Crear una nueva categoría
   * @param data Datos de la categoría
   */
  createCategory(data: { nombre: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(ApiUrls.ADMIN.CATEGORIAS, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Actualizar una categoría
   * @param id ID de la categoría
   * @param data Nuevos datos
   */
  updateCategory(id: number, data: { nombre: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(ApiUrls.ADMIN.CATEGORIA(id), data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Eliminar una categoría
   * @param id ID de la categoría
   */
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(ApiUrls.ADMIN.CATEGORIA(id)).pipe(
      catchError(this.handleError)
    );
  }
  // === PRODUCTOS ===

  /**
   * Obtener todos los productos
   */
  getAllProducts(): Observable<any> {
    return this.http.get(ApiUrls.ADMIN.PRODUCTOS)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtener producto por ID
   * @param id ID del producto
   */
  getProductById(id: number): Observable<any> {
    return this.http.get(ApiUrls.ADMIN.PRODUCTO(id))
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Crear un nuevo producto
   * @param data Datos del producto
   */
  createProduct(data: any): Observable<any> {
    return this.http.post(ApiUrls.ADMIN.PRODUCTOS, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Actualizar un producto
   * @param id ID del producto
   * @param data Nuevos datos
   */
  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(ApiUrls.ADMIN.PRODUCTO(id), data)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Eliminar un producto
   * @param id ID del producto
   */
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(ApiUrls.ADMIN.PRODUCTO(id))
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Subir imágenes de un producto
   * @param productId ID del producto
   * @param formData Imágenes en formato FormData
   */
  uploadProductImages(productId: number, formData: FormData): Observable<any> {
    const url = ApiUrls.PRODUCTOS.UPLOAD_IMAGES(productId); // Asegúrate de tener esta URL en ApiUrls
    const headers = new HttpHeaders();
    return this.http.post(url, formData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // === FUNCIONES AUXILIARES ===

  // Manejo de errores
  private handleError(error: any) {
    console.error('Error en la API:', error);
    return throwError(() => new Error('Error en la petición'));
  }
}