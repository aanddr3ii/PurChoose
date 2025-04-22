import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductDetailService } from '../../services/ProductDetail/product-detail.service';
import { CartService } from '../../services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-footer',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './product-footer.component.html',
  styleUrl: './product-footer.component.css',
})
export class ProductFooterComponent implements OnInit {
  product: any = null;
  userId: number = 1; // ID del usuario actual

  constructor(
    private productDetailService: ProductDetailService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router // Inyecta Router
  ) {}

  ngOnInit(): void {
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
    if (this.product) {
      this.cartService.addToCart(this.userId, this.product); // Añade el producto al carrito
      alert('Producto añadido al carrito');
      this.router.navigate(['/cart']); // Redirige al carrito
    } else {
      console.error('No hay producto disponible para añadir al carrito.');
    }
  }
}