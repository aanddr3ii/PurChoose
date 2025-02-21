import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Importamos los componentes necesarios
import { NavBeltComponent } from "../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../nav-categories/nav-categories.component";
import { InfoPerfilComponent } from '../info-perfil/info-perfil.component';
import { PublicacionesPerfilComponent } from '../publicaciones-perfil/publicaciones-perfil.component';
import { ResenasPerfilComponent } from '../resenas-perfil/resenas-perfil.component';

// Importamos las interfaces
import { User } from '../interfaces/user';
import { Post } from '../interfaces/post';
import { Review } from '../interfaces/review';

// Importamos el servicio de usuario
import { UserService } from '../services/userService/user.service';
import { CardProductComponent } from "../card-product/card-product.component";

@Component({
  selector: 'app-pagina-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavBeltComponent, NavCategoriesComponent, InfoPerfilComponent, PublicacionesPerfilComponent, ResenasPerfilComponent, CardProductComponent],
  templateUrl: './pagina-perfil.component.html',
  styleUrls: ['./pagina-perfil.component.css']
})
export class PaginaPerfilComponent {
  
  activeTab: 'info' | 'publicaciones' | 'reseñas' = 'info'; // Tipo específico

  constructor(private userService: UserService) {}

  // Obtenemos el usuario actual desde el servicio
  get user(): User {
    return this.userService.getUser(); // Usamos el método del servicio
  }

  // Datos de reseñas (simulados)
  reviews: Review[] = [
    { id: 1, text: 'Excelente usuario!', rating: 5 },
    { id: 2, text: 'Muy recomendable.', rating: 4 },
    { id: 3, text: 'Podría mejorar.', rating: 3 },
    { id: 4, text: 'No cumple con mis expectativas.', rating: 2 },
    { id: 5, text: 'Pésima experiencia.', rating: 1 }
  ];

  // Método para editar el perfil
  onEditProfile() {
    alert('Redirigiendo a la página de edición...');
    // Redirigimos al usuario a la página de edición
  }
}