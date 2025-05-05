import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductImageService {
  private apiUrl = '/api/products'; // Base URL del backend

  constructor(private http: HttpClient) {}

  /**
   * Sube múltiples imágenes para un producto específico.
   * @param productId ID del producto al que pertenecen las imágenes.
   * @param images Array de archivos de imágenes.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  uploadImages(productId: number, images: File[]): Observable<any> {
    const formData = new FormData();

    // Agregar cada imagen al FormData
    images.forEach((image) => {
      formData.append('images[]', image);
    });

    // Realizar la solicitud POST al endpoint del backend
    return this.http.post(`${this.apiUrl}/${productId}/upload-images`, formData);
  }


  //ARDEI
  /**
   * Obtiene las imágenes de un producto específico para editarlo.
   * @param productId ID del producto.
   * @returns Un Observable que emite la lista de imágenes del producto.
   */
  getImagesByProductIdedit(productId: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/productos/${productId}/imagenes`);
  }
  
  
  
}