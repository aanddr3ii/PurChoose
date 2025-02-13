import { Component, Input } from '@angular/core';
import { User } from '../interfaces/user'; // Importamos la interfaz User

@Component({
  selector: 'app-info-perfil',
  standalone: true,
  templateUrl: './info-perfil.component.html',
  styleUrls: ['./info-perfil.component.css']
})
export class InfoPerfilComponent {
  @Input() user!: User; // Tipamos user como User
}