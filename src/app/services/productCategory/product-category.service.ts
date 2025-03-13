import { Injectable } from '@angular/core';
import { Category } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})

export class ProductCategoryService {
  private categories: Category[] = [
    {id: 1, text: "Montaña y esquí"},
    {id: 2, text: "Botas"},
    {id: 3, text: "Accesorios"},
    {id: 4, text: "Ropa"}
  ];

  getCategories(): Category[] {
    return this.categories;
  }
}
