import { Component, Input } from '@angular/core';
import { Review } from '../interfaces/review'; // Importamos la interfaz Review

@Component({
  selector: 'app-resenas-perfil',
  standalone: true,
  templateUrl: './resenas-perfil.component.html',
  styleUrls: ['./resenas-perfil.component.css']
})
export class ResenasPerfilComponent {
  @Input() reviews!: Review[]; // Declaramos reviews como una propiedad de entrada
  }