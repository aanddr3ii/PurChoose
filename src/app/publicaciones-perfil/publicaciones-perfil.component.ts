import { Component, Input } from '@angular/core';
import { Post } from '../interfaces/post'; // Importamos la interfaz Post


@Component({
  selector: 'app-publicaciones-perfil',
  standalone: true,
  templateUrl: './publicaciones-perfil.component.html',
  styleUrls: ['./publicaciones-perfil.component.css']
})
export class PublicacionesPerfilComponent {
  @Input() posts!: Post[]; // Declaramos posts como una propiedad de entrada
  ;}