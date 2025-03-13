import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/Product/product.service'; // Importamos el servicio
import { Product } from '../interfaces/product'; // Importamos la interfaz Product
import { CardProductComponent } from '../card-product/card-product.component'; // Importamos el componente CardProduct

@Component({
  selector: 'app-publicaciones-perfil',
  standalone: true,
  templateUrl: './publicaciones-perfil.component.html',
  styleUrls: ['./publicaciones-perfil.component.css'],
  imports: [CardProductComponent] // Importamos el componente CardProduct
})
export class PublicacionesPerfilComponent implements OnInit {
  products: Product[] = []; // Array para almacenar los productos

  constructor(private productService: ProductService) {} // Inyectamos el servicio

  ngOnInit(): void {
    this.products = this.productService.getProducts(); // Cargamos los productos desde el servicio
  }
}