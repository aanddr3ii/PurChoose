import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavBeltComponent } from "../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../nav-categories/nav-categories.component";
import { AdminCategoriesService, Category } from '../services/admin-Categories/admin-categories.service';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [
    TranslateModule,
    NavBeltComponent,
    NavCategoriesComponent,
    FormsModule
  ],
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
  mockCategories: Category[] = [];
  editingCategoryIndex: number | null = null;
  newCategory: Category = { name: '', description: '' };

  constructor(
    private router: Router,
    private adminCategoriesService: AdminCategoriesService
  ) {}

  ngOnInit(): void {
    this.mockCategories = this.adminCategoriesService.getCategories();
  }

  backToAdminMenu(): void {
    this.router.navigate(['/admin']);
  }

  addCategory(): void {
    // Validación mejorada para evitar problemas con espacios en blanco
    if (this.newCategory.name.trim() || this.newCategory.description.trim()) {
      this.adminCategoriesService.addCategory({ ...this.newCategory });
      this.mockCategories = this.adminCategoriesService.getCategories();
      this.resetForm();
    } else {
      alert('Por favor, completa al menos uno de los campos.');
    }
  }

  startEdit(index: number): void {
    this.editingCategoryIndex = index;
    const category = this.mockCategories[index];
    this.newCategory = { ...category };
  }

  saveEdit(): void {
    // Validación mejorada para evitar problemas con espacios en blanco
    if (this.editingCategoryIndex !== null && (this.newCategory.name.trim() || this.newCategory.description.trim())) {
      this.adminCategoriesService.editCategory(this.editingCategoryIndex, { ...this.newCategory });
      this.mockCategories = this.adminCategoriesService.getCategories();
      this.resetForm();
    } else {
      alert('Por favor, completa al menos uno de los campos.');
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  deleteCategory(index: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      this.adminCategoriesService.deleteCategory(index);
      this.mockCategories = this.adminCategoriesService.getCategories();
    }
  }

  private resetForm(): void {
    this.newCategory = { name: '', description: '' };
    this.editingCategoryIndex = null;
  }
}