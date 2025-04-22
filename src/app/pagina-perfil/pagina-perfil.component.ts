import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import{AuthService} from '../services/authService/auth.service';
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
export class PaginaPerfilComponent implements OnInit {
  activeTab: 'info' | 'publicaciones' | 'reseñas' = 'info'; // Tipo específico
  user!: User; // Propiedad para almacenar el usuario actual
  isGuest: boolean = false; // Indica si el usuario es un invitado
  reviews: Review[] = []; // Datos de reseñas (simulados)

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    try {
      // Cargar el usuario autenticado desde la API
      await this.userService.setCurrentUserFromApi();

      // Obtener el usuario actual
      this.user = this.userService.getUser();
      this.isGuest = this.user.role === 'guest'; // Verificar si el rol es 'guest'

      // Inicializar las reseñas simuladas
      this.reviews = [
        { id: 1, text: 'Excelente usuario!', rating: 5 },
        { id: 2, text: 'Muy recomendable.', rating: 4 },
        { id: 3, text: 'Podría mejorar.', rating: 3 },
        { id: 4, text: 'No cumple con mis expectativas.', rating: 2 },
        { id: 5, text: 'Pésima experiencia.', rating: 1 }
      ];
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
      alert('Ocurrió un error al cargar el usuario. Por favor, inténtalo más tarde.');
    }
  }

  // Método para editar el perfil
  onEditProfile(): void {
    if (this.isGuest) {
      alert('Debes iniciar sesión para editar tu perfil.');
      return;
    }
    alert('Redirigiendo a la página de edición...');
    // Redirigimos al usuario a la página de edición
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  
}