import { Injectable } from '@angular/core';

export interface Category {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminCategoriesService {
  private categoriesKey = 'categories'; // Clave para localStorage

  constructor() {}

  // Obtener todas las categorías
  getCategories(): Category[] {
    const storedCategories = localStorage.getItem(this.categoriesKey);
    return storedCategories ? JSON.parse(storedCategories) : [];
  }

  // Añadir una nueva categoría
  addCategory(category: Category): void {
    const categories = this.getCategories();
    categories.push(category);
    this.saveCategories(categories);
  }

  // Editar una categoría existente
  editCategory(index: number, updatedCategory: Category): void {
    const categories = this.getCategories();
    if (index >= 0 && index < categories.length) {
      categories[index] = updatedCategory;
      this.saveCategories(categories);
    }
  }

  // Eliminar una categoría
  deleteCategory(index: number): void {
    const categories = this.getCategories();
    if (index >= 0 && index < categories.length) {
      categories.splice(index, 1);
      this.saveCategories(categories);
    }
  }

  // Guardar categorías en localStorage
  private saveCategories(categories: Category[]): void {
    localStorage.setItem(this.categoriesKey, JSON.stringify(categories));
  }
}