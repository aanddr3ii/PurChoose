import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { NavBeltComponent } from "../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../nav-categories/nav-categories.component";
import { AdminService } from '../services/admin/admin.service';
import { CategoryD } from '../interfaces/categoryD';

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
  categories: CategoryD[] = [];
  editingCategoryIndex: number | null = null;
  newCategory: CategoryD = { nombre: '' };

  constructor(
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.adminService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        alert('No se pudieron cargar las categorías');
      }
    });
  }

  backToAdminMenu(): void {
    this.router.navigate(['/admin']);
  }

addCategory(): void {
  const name = this.newCategory.nombre.trim();

  if (!name) {
    alert('El nombre es obligatorio.');
    return;
  }

  this.adminService.createCategory({ nombre: name }).subscribe({
    next: (category) => {
      this.categories.push(category);
      this.resetForm();
    },
    error: (err) => {
      console.error('Error al crear categoría:', err);
      alert('Hubo un error al crear la categoría');
    }
  });
}

  startEdit(index: number): void {
    this.editingCategoryIndex = index;
    const category = this.categories[index];
    this.newCategory = { ...category };
  }

  saveEdit(): void {
    if (this.editingCategoryIndex === null) return;

    const categoryId = this.categories[this.editingCategoryIndex].id;
    if (!categoryId) return;

    const payload = {
      nombre: this.newCategory.nombre
    };

    this.adminService.updateCategory(categoryId, payload).subscribe({
      next: (updatedCategory) => {
        this.categories[this.editingCategoryIndex!] = updatedCategory;
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al actualizar categoría:', err);
        alert('Hubo un error al actualizar la categoría');
      }
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  deleteCategory(index: number): void {
    const categoryId = this.categories[index].id;
    if (!categoryId) return;

    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      this.adminService.deleteCategory(categoryId).subscribe({
        next: () => {
          this.categories.splice(index, 1);
        },
        error: (err) => {
          console.error('Error al eliminar categoría:', err);
          alert('Hubo un error al eliminar la categoría');
        }
      });
    }
  }

  private resetForm(): void {
    this.newCategory = { nombre: '' };
    this.editingCategoryIndex = null;
  }
}