import { Component, OnInit } from '@angular/core';
import { CategoryService} from '../services/CatgeoryService/category.service'; // Importa el servicio y la interfaz
import { Category } from '../interfaces/category'; // Importa la interfaz de categoría
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-categories',
  standalone: true,
  imports: [RouterLink, TranslateModule, RouterModule],
  templateUrl: './nav-categories.component.html',
  styleUrls: ['./nav-categories.component.css'],
})
export class NavCategoriesComponent implements OnInit {
  isSidenavOpen = false; // Controla si el sidenav está abierto
  allCategories: Category[] = []; // Todas las categorías obtenidas del backend
  mainCategories: Category[] = []; // Solo las primeras 5 categorías

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Método para cargar las categorías desde el backend
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.allCategories = data; // Asigna todas las categorías
        this.mainCategories = data.slice(0, 5); // Toma solo las primeras 5 categorías
      },
      error: (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    });
  }

  // Método para alternar la visibilidad del sidenav
  toggleSidenav(event: Event): void {
    event.preventDefault();
    this.isSidenavOpen = !this.isSidenavOpen;

    if (this.isSidenavOpen) {
      document.body.classList.add('no-scroll'); // No puedes hacer scroll
    } else {
      document.body.classList.remove('no-scroll'); // Vuelves a poder hacer scroll
    }
  }
}