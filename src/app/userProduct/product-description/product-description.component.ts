import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from '../../services/ProductDetail/product-detail.service'; // Importa el nuevo servicio
import { ProductCategoryService } from '../../services/productCategory/product-category.service';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router'; // Para obtener el ID de la ruta
import { ProductUserBarComponent } from '../product-user-bar/product-user-bar.component';

@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [TranslateModule,ProductUserBarComponent],
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css'],
})
export class ProductDescriptionComponent implements OnInit {
  product: Product | null = null; // Cambiamos a un solo producto
  categories: Category[] = [];

  constructor(
    private productDetailService: ProductDetailService, // Inyecta el nuevo servicio
    private categoryService: ProductCategoryService,
    private route: ActivatedRoute // Para obtener el ID de la ruta
  ) {}

  ngOnInit(): void {
    // Obtener el ID del producto de la ruta
    const productId = this.route.snapshot.params['id'];
    
    if (productId) {
      // Usar el servicio de detalles del producto
      this.productDetailService.getProductDetails(productId).subscribe({
        next: (data) => {
          this.product = data; // Asignar el producto obtenido
        },
        error: (error) => {
          console.error('Error al cargar los detalles del producto:', error);
        },
      });
    }

    // Si necesitas cargar categorías, mantén este código
    this.categoryService.getCategories().subscribe({
       next: (data) => {
         this.categories = data;
       },
       error: (error) => {
         console.error(error);
       },
     });
  }

  // Método para obtener el user_id con un valor predeterminado
  getUserId(): number {
    return this.product?.user_id || 0; // Si user_id es undefined, devuelve 0
  }
}