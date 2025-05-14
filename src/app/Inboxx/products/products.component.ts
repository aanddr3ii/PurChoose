import { Component } from '@angular/core';
import { NavBeltComponent } from '../../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../../nav-categories/nav-categories.component';
import { LeftBarComponent } from '../left-bar/left-bar.component';
import { TranslateModule } from '@ngx-translate/core';

//produ xixa
import { ProductService } from '../../services/Product/product.service';
import { Product } from '../../interfaces/product';
import { ApiUrls } from '../../Shared/api-urls'; // Importa las URLs de la API
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service'; // Importa el servicio de autenticación
import { User } from '../../interfaces/user'; // Importa la interfaz de usuario

//

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent, LeftBarComponent, TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productos: any[] = [];
  isInfoVisible: boolean = false;



  constructor(private productService: ProductService, private http: HttpClient, private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    const userId = this.authService.getUserId();
  
    if (!userId) {
      console.error('Usuario no identificado');
      return;
    }
  
    this.productService.getProductsByUserId(userId).subscribe({
      next: (res) => {
        this.productos = res.productos;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }
  
  // administracion de productos
  editarProducto(id: number): void {
    this.router.navigate(['/edit-product'], {
      queryParams: { id }
    });
  }
  
  eliminarProducto(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.productos = this.productos.filter(p => p.id !== id);
    });
  }

  getProductsByUserId(userId: number): Observable<any> {
    return this.http.get(`${ApiUrls.BASE_URL}/productos/por-usuario/${userId}`);
  }

  selectedProduct: any = null;

  toggleInfo(producto: any): void {
    this.selectedProduct = producto;
    this.isInfoVisible = true;
  }

  closeModal(): void {
    this.isInfoVisible = false;
    this.selectedProduct = null;
  }
  
}
