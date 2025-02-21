import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importamos CommonModule para usar DatePipe
import { User } from '../interfaces/user';

@Component({
  selector: 'app-info-perfil',
  standalone: true,
  imports: [CommonModule], // Aseguramos que los pipes globales estén disponibles
  templateUrl: './info-perfil.component.html',
  styleUrls: ['./info-perfil.component.css']
})
export class InfoPerfilComponent {
  @Input() user!: User; // Definimos el input para recibir el usuario desde el padre
}