import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
   * Crea un nuevo producto.
   * @param productData Datos del producto a crear.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  createProduct(productData: any): Observable<any> {
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

  /**
   * Obtiene las imágenes de un producto específico.
   * @param productId ID del producto.
   * @returns Un Observable que emite las URLs de las imágenes.
   */
  getImagesByProductId(productId: number): Observable<string[]> {
    return this.http.get<any>(`${ApiUrls.PRODUCTOS.IMAGES(productId)}`).pipe(
      map((response) => {
        // Extraer las URLs de las imágenes y agregar el dominio si es necesario
        return response.imagenes.map((image: { url: string }) => {
          if (image.url.startsWith('/storage')) {
            return `http://localhost:8000${image.url}`;
          }
          return image.url;
        });
      }),
      catchError((error) => {
        console.error('Error al obtener las imágenes del producto:', error);
        return throwError(() => new Error('No se pudieron cargar las imágenes.'));
      })
    );
  }
  getProductsWithCategoriesAndImages(): Observable<any> {
    return this.http.get(ApiUrls.PRODUCTOS.WITH_CATEGORIES_AND_IMAGES).pipe(
      catchError((error) => {
        console.error('Error al obtener los productos con categorías e imágenes:', error);
  
        if (error.status === 404) {
          return throwError(() => new Error('La ruta no existe. Verifica la URL.'));
        } else if (error.status === 0) {
          return throwError(() => new Error('No se pudo conectar con el servidor. Verifica CORS.'));
        } else if (error.error instanceof ProgressEvent) {
          return throwError(() => new Error('Ocurrió un error de red. Verifica la conexión.'));
        } else {
          return throwError(() => new Error('Ocurrió un error inesperado.'));
        }
      })
    );
  }
  /**
   * Sube imágenes para un producto específico.
   * @param productId ID del producto.
   * @param images Array de archivos de imágenes.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  uploadImages(productId: number, images: File[]): Observable<any> {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images[]', image);
    });

    return this.http.post(ApiUrls.PRODUCTOS.UPLOAD_IMAGES(productId), formData).pipe(
      catchError((error) => {
        console.error('Error al subir imágenes:', error);
        return throwError(() => new Error('No se pudieron subir las imágenes.'));
      })
    );
  }

  /**
   * Obtiene los productos de un usuario específico.
   * @param userId ID del usuario.
   * @returns Un Observable que emite la lista de productos del usuario.
   */
  getProductsByUserId(userId: number): Observable<{
    user: { id: number; nombre: string; email: string };
    productos: {
      id: number;
      titulo: string;
      precio: number;
      publicado: string;
      modificado: string;
      imagen: string | null;
    }[];
  }> {
    return this.http.get<{
      user: { id: number; nombre: string; email: string };
      productos: {
        id: number;
        titulo: string;
        precio: number;
        publicado: string;
        modificado: string;
        imagen: string | null;
      }[];
    }>(`${ApiUrls.BASE_URL}/productos/por-usuario/${userId}`);
  }
  


  
  
  
}