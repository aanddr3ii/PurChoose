import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../interfaces/review';

@Component({
  selector: 'app-resenas-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resenas-perfil.component.html',
  styleUrls: ['./resenas-perfil.component.css']
})
export class ResenasPerfilComponent {
  @Input() reviews!: Review[];

  // Método para generar estrellas activas/inactivas
  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? 'active' : 'inactive');
    }
    return stars;
  }
}