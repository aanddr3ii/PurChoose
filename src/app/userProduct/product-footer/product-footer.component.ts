import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductDetailService } from '../../services/ProductDetail/product-detail.service';
import { CartService } from '../../services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service'; // Importa AuthService

@Component({
  selector: 'app-product-footer',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './product-footer.component.html',
  styleUrl: './product-footer.component.css',
})
export class ProductFooterComponent implements OnInit {
  product: any = null;
  userId: number | null = null; // Declarar userId como nulo inicialmente

  constructor(
    private productDetailService: ProductDetailService,
    private cartService: CartService,
    private authService: AuthService, // Inyecta AuthService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del usuario autenticado
    this.userId = this.authService.getUserId();
    console.log('Usuario ID obtenido:', this.userId);

    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (productId) {
      this.productDetailService.getProductDetails(productId).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (error) => {
          console.error('Error al cargar los detalles del producto:', error);
        },
      });
    } else {
      console.error('ID del producto no encontrado en la URL.');
    }
  }

  addToCart(): void {
    if (!this.userId) {
      console.error('Error: No se encontró un ID de usuario válido.');
      return;
    }

    if (this.product && this.product.id) {
      const productId = this.product.id; // Extrae el ID del producto

      // Imprime el userId y productId para depuración
      console.log('Usuario ID antes de enviar:', this.userId);
      console.log('Producto ID antes de enviar:', productId);

      this.cartService.addToCart(this.userId, productId).subscribe({
        next: () => {
          alert('Producto añadido al carrito');
          this.router.navigate(['/cart']); // Redirige al carrito
        },
        error: (error) => {
          console.error('Error al añadir el producto al carrito:', error);
        },
      });
    } else {
      console.error('No hay producto disponible para añadir al carrito.');
    }
  }
}