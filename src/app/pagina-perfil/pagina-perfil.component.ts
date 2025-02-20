  import { Component } from '@angular/core';
  import { NavBeltComponent } from "../nav-belt/nav-belt.component";
  import { NavCategoriesComponent } from "../nav-categories/nav-categories.component";
  import { InfoPerfilComponent } from '../info-perfil/info-perfil.component';
  import { PublicacionesPerfilComponent } from '../publicaciones-perfil/publicaciones-perfil.component';
  import { ResenasPerfilComponent } from '../resenas-perfil/resenas-perfil.component';
  import { User } from '../interfaces/user';
  import { Post } from '../interfaces/post';
  import { Review } from '../interfaces/review';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

  @Component({
    selector: 'app-pagina-perfil',
    standalone: true,
    templateUrl: './pagina-perfil.component.html',
    styleUrls: ['./pagina-perfil.component.css'],
    imports: [NavBeltComponent, NavCategoriesComponent, InfoPerfilComponent,PublicacionesPerfilComponent,ResenasPerfilComponent,FormsModule, RouterModule]
  })
  
  export class PaginaPerfilComponent {
    // Datos del usuario
    activeTab: 'info' | 'publicaciones' | 'reseñas' = 'info'; // Tipo específico

    user: User = {
      name: 'El Presidente',
      bio: 'soy un presidente naranja',
      avatar: 'https://s.france24.com/media/display/b1bb448c-d51e-11ef-bb54-005056a90284/w:1280/p:4x3/Trumpretratooficial.jpg',
      email: 'elpresi@elmuro.com',
      location: 'Washington D.C, USA',
      birthday: '01/01/1990',
      posts: 123,
      followers: 456,
      following: 789,
      rating: 3
    };

    posts: Post[] = [
      { id: 1, image: 'https://via.placeholder.com/300x200' },
      { id: 2, image: 'https://via.placeholder.com/300x200' }
    ];

    reviews: Review[] = [
      { id: 1, text: 'Excelente usuario!', rating: 5 },
      { id: 2, text: 'Muy recomendable.', rating: 4 },
      { id: 3, text: 'Podría mejorar.', rating: 3 },
      { id: 4, text: 'No cumple con mis expectativas.', rating: 2 },
      { id: 5, text: 'Pésima experiencia.', rating: 1 }
    ];
    onEditProfile() {
      alert('Funcionalidad de edición de perfil no implementada aún.');
    }
  }