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

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiUrls } from '../Shared/api-urls'; // Importa las URLs de la API
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/userService/user.service'; // Importa el servicio de usuario
import { ActivatedRoute } from '@angular/router';
import { EditProductImageComponent } from "../../app/edit-product-image/edit-product-image.component"; // Recuperamos el id del producto desde la URL para editarlo y poder actualizarlo


@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,
    NavBeltComponent,
    NavCategoriesComponent,
    RouterModule, EditProductImageComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  productForm!: FormGroup;
  categories: Category[] = [];
  selectedCategories: (number | null)[] = []; // ← NO pongas ningún valor inicial
  selectedFiles: File[] = []; // Imágenes seleccionadas

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient, // Inject HttpClient service
    private route: ActivatedRoute
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
      
    })
    

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
  
      if (id) {
        this.productService.getProductById(+id).subscribe(product => {
          this.productForm.patchValue({
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            estado: product.estado,
            oferta: product.oferta,
            ubicacion: product.ubicacion,
            user_id: product.user_id
          });
  
          // Cargar categorías si vienen en array de IDs
          this.selectedCategories = product.categorias ?? [null];
        });
      }
    });
   
    
    
    ;

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


  //Metodos categoria   ---falta apañarlo
  // Añadir un nuevo campo de categoría
  addCategoryField(): void {
    this.selectedCategories.push(null); // Añade un nuevo campo vacío
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
              this.router.navigate(['/products']);
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

  // EDITAR PRODUCTO ARRDDEEEIII todo menos imagen y categorias
    getProductsByUserId(userId: number): Observable<any> {
      return this.http.get(`${ApiUrls.BASE_URL}/productos/por-usuario/${userId}`);
    }
}
