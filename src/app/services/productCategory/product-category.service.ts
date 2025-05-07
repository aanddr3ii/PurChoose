import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/category';
import { ApiUrls } from '../../Shared/api-urls';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private apiUrl: string = ApiUrls.BASE_URL;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(ApiUrls.CATEGORIAS.LIST); // Asegúrate de que la URL es correcta
  }

  getCategoriesByProductId(productId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/productos/${productId}/categorias`);
  }

  // para enseñar la categoria en edit product
  getCategoriesByProductIdEdit(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias/producto/${productId}`);
  }
  // para actualizar la categoria en edit product
  updateProductCategories(productId: number, categoryIds: number[]): Observable<any> {
    return this.http.put(`http://localhost:8000/api/productos/${productId}/categorias`, {
      categorias: categoryIds
    });
  }
  
  
  
  
}