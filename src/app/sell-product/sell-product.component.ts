import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/Product/product.service';
import { CategoryService } from '../services/CatgeoryService/category.service';
import { AuthService } from '../services/authService/auth.service';
import { Category } from '../interfaces/category';
import { NavBeltComponent } from '../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { RouterModule } from '@angular/router';
import { SellProductPictureComponent } from '../sell-product-picture/sell-product-picture.component';

@Component({
  selector: 'app-sell-product',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,
    NavBeltComponent,
    NavCategoriesComponent,
    RouterModule,
    SellProductPictureComponent,
  ],
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.css'],
})
export class SellProductComponent {
  productForm!: FormGroup;
  categories: Category[] = [];
  selectedCategories: number[] = []; // Categorías seleccionadas
  selectedFiles: File[] = []; // Imágenes seleccionadas

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario reactivo
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [null, [Validators.required, Validators.min(0)]],
      estado: ['nuevo', Validators.required],
      oferta: [false],
      ubicacion: [''],
      user_id: [this.getUserId()], // Obtener el ID del usuario autenticado
    });

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

  // Método para obtener el ID del usuario autenticado
  getUserId(): number | null {
    const user = this.authService.getCurrentUser();
    return user ? user.id : null; // Devuelve el ID del usuario o null si no hay usuario
  }

  // Añadir un nuevo campo de categoría
  addCategoryField(): void {
    this.selectedCategories.push(1); // Añade un nuevo campo vacío
  }

  // Eliminar un campo de categoría
  removeCategory(index: number): void {
    this.selectedCategories.splice(index, 1); // Elimina el campo seleccionado
  }

  // Manejar las imágenes seleccionadas desde el componente hijo
  onFilesSelected(files: File[]): void {
    this.selectedFiles = files;
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
  
    const formData = this.productForm.value;
    formData.categorias = this.selectedCategories.filter((id) => id !== null);
  
    this.productService.createProduct(formData).subscribe({
      next: (response) => {
        const productId = response.producto.id;
  
        if (this.selectedFiles.length > 0) {
          this.productService.uploadImages(productId, this.selectedFiles).subscribe({
            next: (imageResponse) => {
              console.log('Imágenes subidas correctamente:', imageResponse);
              alert('Producto creado y imágenes subidas exitosamente.');
            },
            error: (error) => {
              console.error('Error al subir imágenes:', error);
              alert('Ocurrió un error al subir las imágenes.');
            },
          });
        } else {
          alert('Producto creado exitosamente.');
        }
      },
      error: (error) => {
        console.error('Error al crear el producto:', error);
        alert('Ocurrió un error al crear el producto');
      },
    });
  }
}