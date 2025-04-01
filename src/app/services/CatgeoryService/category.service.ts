import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrls } from '../../Shared/api-urls'; // Importa las URLs de la API

export interface Category {
  id: number;
  nombre: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // Método para obtener todas las categorías
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(ApiUrls.CATEGORIAS.LIST);
  }
}