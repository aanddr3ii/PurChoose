import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/Product/product.service'; // Importamos el servicio
import { Product } from '../interfaces/product'; // Importamos la interfaz Product
import { CardProductComponent } from '../card-product/card-product.component'; // Importamos el componente CardProduct

@Component({
  selector: 'app-publicaciones-perfil',
  standalone: true,
  templateUrl: './publicaciones-perfil.component.html',
  styleUrls: ['./publicaciones-perfil.component.css'],
  imports: [CardProductComponent], // Importamos el componente CardProduct
})
export class PublicacionesPerfilComponent implements OnInit {
  products: Product[] = []; // Array para almacenar los productos

  constructor(private productService: ProductService) {} // Inyectamos el servicio

  ngOnInit(): void {
    // Suscribirse al Observable para obtener los productos
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data; // Asignar los productos obtenidos
      },
      error: (error: any) => {
        console.error('Error al cargar los productos:', error);
      },
    });
  }
}