import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para obtener el ID del producto de la URL
import { ProductDetailService } from '../../services/ProductDetail/product-detail.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-user-bar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './product-user-bar.component.html',
  styleUrls: ['./product-user-bar.component.css'],
})
export class ProductUserBarComponent implements OnInit {
  userName: string | null = null; // Nombre del usuario propietario (null si no se carga)

  constructor(
    private route: ActivatedRoute, // Para obtener el ID del producto de la URL
    private productDetailService: ProductDetailService // Para obtener el nombre del usuario
  ) {}

  ngOnInit(): void {
    // Obtener el ID del producto de la URL
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (productId) {
      // Obtener el nombre del usuario propietario usando el ProductDetailService
      this.productDetailService.getUserName(productId).subscribe({
        next: (userName) => {
          this.userName = userName;
        },
        error: (error) => {
          console.error('Error al cargar el nombre del usuario:', error.message);
          this.userName = 'Error al cargar el usuario';
        },
      });
    }
  }
}