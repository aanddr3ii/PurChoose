import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/Product/product.service';
import { CategoryService } from '../services/CatgeoryService/category.service';
import { Category } from '../interfaces/category';
import { Product } from '../interfaces/product';
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { RouterModule } from '@angular/router';
import { SellProductPictureComponent } from '../sell-product-picture/sell-product-picture.component';
import { AuthService } from '../services/authService/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-sell-product',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent, FormsModule, ReactiveFormsModule, RouterModule, SellProductPictureComponent],
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.css'],
})
export class SellProductComponent {
  productForm: FormGroup;
  categories: Category[] = [];
  selectedCategories: number[] = []; // Array para almacenar las categorías seleccionadas

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService, 
    private authService: AuthService // Inyecta el servicio de autenticación
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, Validators.required],
      estado: ['nuevo', Validators.required],
      oferta: [false],
      ubicacion: [''],
      user_id: [this.getUserId()], // Obtiene el ID del usuario autenticado
    });
  }
 // Método para obtener el ID del usuario autenticado
 getUserId(): number | null {
  const user = this.authService.getCurrentUser();
  return user ? user.id : null; // Devuelve el ID del usuario o null si no hay usuario
}
  ngOnInit(): void {
    // Cargar categorías disponibles
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error al cargar las categorías:', error);
      },
    });

    // Inicializar con una categoría por defecto
    this.addCategoryField();
  }

    // Añadir un nuevo campo de categoría
    addCategoryField(): void {
      this.selectedCategories.push(1); // Añade un nuevo campo vacío
    }

  // Eliminar un campo de categoría
  removeCategory(index: number): void {
    this.selectedCategories.splice(index, 1); // Elimina el campo seleccionado
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;

      // Añadir las categorías seleccionadas al formulario
      formData.categorias = this.selectedCategories.filter((id) => id !== null);

      // Enviar los datos al backend
      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          console.log('Producto creado:', response);
          alert('Producto creado exitosamente');
        },
        error: (error) => {
          console.error('Error al crear el producto:', error);
          alert('Ocurrió un error al crear el producto');
        },
      });
    }
  }
}