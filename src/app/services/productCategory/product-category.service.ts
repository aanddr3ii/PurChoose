import { Injectable } from '@angular/core';
import { Category } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})

export class ProductCategoryService {
  private categories: Category[] = [
    {id: 1, nombre: "Montaña y esquí"},
    {id: 2, nombre: "Botas"},
    {id: 3, nombre: "Accesorios"},
    {id: 4, nombre: "Ropa"}
  ];

  getCategories(): Category[] {
    return this.categories;
  }
}
