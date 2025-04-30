import { Component } from '@angular/core';
import { NavBeltComponent } from '../../nav-belt/nav-belt.component';
import { NavCategoriesComponent } from '../../nav-categories/nav-categories.component';
import { LeftBarComponent } from '../left-bar/left-bar.component';

//produ xixa
import { ProductService } from '../../services/Product/product.service';
import { Product } from '../../interfaces/product';
import { ApiUrls } from '../../Shared/api-urls'; // Importa las URLs de la API
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../services/userService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavBeltComponent, NavCategoriesComponent, LeftBarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productos: any[] = [];

  constructor(private productService: ProductService, private http: HttpClient, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const user = this.userService.getUser();
    if (user && user.id !== undefined) {
      const userId = user.id;
      console.log('User ID cargado:', userId); // útil para depurar
    
      this.productService.getProductsByUserId(userId).subscribe((res) => {
        this.productos = res.productos;
      });
    } else {
      console.error('User ID is undefined');
    }
  }
  
  editarProducto(id: number): void {
    this.router.navigate(['/sell-product'], {
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
  
}
