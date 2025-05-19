// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrls } from '../../Shared/api-urls'; // Importa las URLs de la API
import { Category } from '../../interfaces/category'; // Importa la interfaz de categoría

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // Método para obtener todas las categorías
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(ApiUrls.CATEGORIAS.LIST);
  }

  // Nuevo método: enviar IDs de categorías seleccionadas
  filterByCategories(categoryIds: number[]): Observable<any> {
    return this.http.post(ApiUrls.CATEGORIAS.FILTER, {
      categories: categoryIds,
    });
  }
}