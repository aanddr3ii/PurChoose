import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoryService } from '../services/CatgeoryService/category.service'; // Importa el servicio de categorías
import { ProductService } from '../services/Product/product.service'; // Importa el servicio de productos
import { Category } from '../interfaces/category'; // Importa la interfaz de categoría
import { Product } from '../interfaces/product'; // Importa la interfaz de producto
// Componentes
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { CardProductComponent } from '../card-product/card-product.component';

// Pipes y FormsModule
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-product',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent, CardProductComponent, AsyncPipe, FormsModule, RouterModule],
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css']
})
export class CategoryProductComponent implements OnInit {
  categoryId!: number; // ID de la categoría seleccionada
  products: Product[] = []; // Todos los productos
  filteredProducts: Product[] = []; // Productos filtrados
  allCategories: Category[] = []; // Todas las categorías disponibles

  // Cambiamos selectedCategories por getter/setter
  private _selectedCategories: number[] = [];

  get selectedCategories(): number[] {
    return this._selectedCategories;
  }

  set selectedCategories(value: number[]) {
    this._selectedCategories = value;
    this.sendCategoriesToLaravel(); // Enviar automáticamente al cambiar
  }

  // Filtros
  filters = {
    price: null as 'asc' | 'desc' | null,
    popularity: null as 'asc' | 'desc' | null,
    dateRange: null as '24h' | '7d' | '30d' | null
  };

  // Opciones de filtro por fecha
  dateOptions = [
    { label: 'Todos', value: null },
    { label: '24 horas', value: '24h' },
    { label: '7 días', value: '7d' },
    { label: '30 días', value: '30d' }
  ];

  // Estados del producto
  productStates = [
    { value: 'Nuevo', label: 'Nuevo', description: 'Nunca se ha usado' },
    { value: 'Usado', label: 'Usado', description: 'Conserva el precinto' },
  ];

  selectedStates: string[] = []; // Estados seleccionados como filtros
  openFilter: string | null = null; // Filtro abierto

  // Propiedad para controlar si el dropdown está abierto
  isDropdownOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService // Servicio de productos
  ) {}

  ngOnInit(): void {
     // Obtener todos los productos con sus categorías e imágenes
     this.productService.getProductsWithCategoriesAndImages().subscribe({
      next: (response) => {
        this.products = response.productos; // Asignar los productos obtenidos
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      },
    });
    // Obtener el ID de la categoría desde la URL
    this.route.params.subscribe((params) => {
      this.categoryId = +params['id']; // Obtiene el ID de la categoría
      this.loadAllCategories(); // Cargar todas las categorías
      this.loadProducts(); // Cargar productos
    });
  }

  // Cargar todas las categorías disponibles
  loadAllCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.allCategories = categories;

        // Activar automáticamente la categoría correspondiente al ID de la URL
        if (!this.selectedCategories.includes(this.categoryId)) {
          this.addCategoryFilter(this.categoryId); // Añade la categoría al filtro
        }
      },
      error: (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    });
  }

  loadProducts(): void {
    // Si hay categorías seleccionadas, filtramos los productos por esas categorías
    if (this.selectedCategories.length > 0) {
      this.productService.getProductsByCategories(this.selectedCategories).subscribe({
        next: (data) => {
          this.products = data;
          this.filteredProducts = [...this.products]; // Inicializa los productos filtrados
        },
        error: (error) => {
          console.error('Error al cargar los productos:', error);
        }
      });
    } else {
      // Si no hay categorías seleccionadas, cargamos todos los productos
      this.productService.getProducts().subscribe({
        next: (data) => {
          this.products = data;
          this.filteredProducts = [...this.products]; // Inicializa los productos filtrados
        },
        error: (error) => {
          console.error('Error al cargar los productos:', error);
        }
      });
    }
  }

  // Añadir una categoría como filtro adicional
  addCategoryFilter(categoryId: number): void {
    if (!this.selectedCategories.includes(categoryId)) {
      this.selectedCategories.push(categoryId); // Añade la categoría al filtro
      this.applyFilters(); // Aplica los filtros actualizados
    }
  }

  // Método para obtener el nombre de una categoría por su ID
  getCategoryNameById(categoryId: number): string {
    const category = this.allCategories.find(cat => cat.id === categoryId);
    return category ? category.nombre : 'Categoría desconocida';
  }

  // Eliminar una categoría del filtro
  removeCategoryFilter(categoryId: number): void {
    this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId); // Elimina la categoría
    this.applyFilters(); // Aplica los filtros actualizados
  }

  // Aplicar filtros basados en las categorías seleccionadas
  applyFilters(): void {
    this.filteredProducts = this.products
      .filter(product => {
        // Filtrar por rango de fecha
        if (this.filters.dateRange) {
          const now = new Date().getTime();
          const productDate = new Date(product.created_at ?? 0).getTime();
          const range = { '24h': 1, '7d': 7, '30d': 30 }[this.filters.dateRange];
          return (now - productDate) <= (range || 0) * 24 * 60 * 60 * 1000;
        }
        return true; // No hay filtro de fecha activo
      })
      .filter(product => {
        // Filtrar por estado del producto
        if (this.selectedStates.length > 0) {
          return this.selectedStates.includes(product.estado ?? '');
        }
        return true; // No hay filtro de estado activo
      })
      .filter(product => {
        // Filtrar por categorías seleccionadas
        if (this.selectedCategories.length > 0) {
          return this.selectedCategories.every(categoryId => product.categoryIds?.includes(categoryId));
        }
        return true; // No hay filtro de categoría activo
      });

    // Ordenar productos según los filtros seleccionados
    if (this.filters.price === 'asc') {
      this.filteredProducts.sort((a, b) => a.precio - b.precio);
    } else if (this.filters.price === 'desc') {
      this.filteredProducts.sort((a, b) => b.precio - a.precio);
    }
  }

  // Cambiar el filtro de precio
  changePriceFilter(order: 'asc' | 'desc'): void {
    this.filters.price = order;
    this.applyFilters();
  }

  // Cambiar el filtro de popularidad (no está implementado en esta versión)
  changePopularityFilter(order: 'asc' | 'desc'): void {
    this.filters.popularity = order;
    this.applyFilters();
  }

  // Cambiar el filtro de rango de fecha
  changeDateRangeFilter(range: string): void {
    if (range === '24h' || range === '7d' || range === '30d' || range === null) {
      this.filters.dateRange = range as '24h' | '7d' | '30d' | null;
      this.applyFilters();
    } else {
      console.warn('Valor inválido para dateRange:', range);
    }
  }

  // Alternar un estado como filtro
  toggleStateFilter(state: string): void {
    if (this.selectedStates.includes(state)) {
      this.selectedStates = this.selectedStates.filter(s => s !== state);
    } else {
      this.selectedStates.push(state);
    }
    this.applyFilters();
  }

  // Alternar un filtro
  toggleFilter(name: string): void {
    this.openFilter = this.openFilter === name ? null : name;
  }

  // Alternar el estado del dropdown
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen; // Alterna entre true y false
  }

  // ————————————————————————————————
  // ✨ NUEVO: Método que envía las categorías a Laravel
  sendCategoriesToLaravel(): void {
    this.categoryService.filterByCategories(this.selectedCategories).subscribe({
      next: (response) => {
        console.log('Categorías enviadas correctamente:', response);
      },
      error: (err) => {
        console.error('Error al enviar categorías a Laravel:', err);
      }
    });
  }
}