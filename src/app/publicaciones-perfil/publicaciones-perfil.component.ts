import { Component, Input } from '@angular/core';
import { Post } from '../interfaces/post';
import { CardProductComponent } from "../card-product/card-product.component"; // Importamos la interfaz Post


@Component({
  selector: 'app-publicaciones-perfil',
  standalone: true,
  templateUrl: './publicaciones-perfil.component.html',
  styleUrls: ['./publicaciones-perfil.component.css'],
  imports: [CardProductComponent]
})
export class PublicacionesPerfilComponent {
  @Input() posts!: Post[]; // Declaramos posts como una propiedad de entrada
  ;}