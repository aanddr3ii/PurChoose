  import { Component } from '@angular/core';
  import { NavBeltComponent } from "../nav-belt/nav-belt.component";
  import { NavCategoriesComponent } from "../nav-categories/nav-categories.component";
  import { InfoPerfilComponent } from '../info-perfil/info-perfil.component';
  import { PublicacionesPerfilComponent } from '../publicaciones-perfil/publicaciones-perfil.component';
  import { ResenasPerfilComponent } from '../resenas-perfil/resenas-perfil.component';
  import { User } from '../interfaces/user';
  import { Post } from '../interfaces/post';
  import { Review } from '../interfaces/review';

  @Component({
    selector: 'app-pagina-perfil',
    standalone: true,
    templateUrl: './pagina-perfil.component.html',
    styleUrls: ['./pagina-perfil.component.css'],
    imports: [NavBeltComponent, NavCategoriesComponent, InfoPerfilComponent,PublicacionesPerfilComponent,ResenasPerfilComponent,]
  })
  export class PaginaPerfilComponent {
    // Datos del usuario
    activeTab: 'info' | 'publicaciones' | 'reseñas' = 'info'; // Tipo específico

    user: User = {
      name: 'Nombre de Usuario',
      bio: 'Una breve descripción sobre mí.',
      avatar: 'https://via.placeholder.com/150',
      email: 'usuario@example.com',
      location: 'Ciudad, País',
      birthday: '01/01/1990',
      posts: 123,
      followers: 456,
      following: 789
    };

    posts: Post[] = [
      { id: 1, image: 'https://via.placeholder.com/300x200' },
      { id: 2, image: 'https://via.placeholder.com/300x200' }
    ];

    reviews: Review[] = [
      { id: 1, text: 'Excelente usuario!', rating: 5 },
      { id: 2, text: 'Muy recomendable.', rating: 4 }
    ];

    onEditProfile() {
      alert('Funcionalidad de edición de perfil no implementada aún.');
    }
  }