import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { User } from '../../interfaces/user';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css'],
  standalone: true,
  imports: [TranslateModule, RouterModule]
})
export class LeftBarComponent implements OnInit {
  user: User | null = null;
  defaultAvatar = 'http://localhost:8000/assets/default-avatar.png';

  constructor(private authService: AuthService) {}

ngOnInit(): void {
  const currentUser = this.authService.getCurrentUser();

  if (currentUser) {
    // Copiamos el usuario actual
    const user = { ...currentUser };

    // Ruta base del backend
    const backendUrl = 'http://localhost:8000';

    // fotoPerfil puede estar vacía o ser relativa
    let fotoPerfil = user.fotoPerfil;

    if (!fotoPerfil) {
      // Usa avatar por defecto si no hay foto
      fotoPerfil = `${backendUrl}/assets/default-avatar.png`;
    } else if (!fotoPerfil.startsWith('http')) {
      // Si es relativo, le añadimos la base URL
      fotoPerfil = `${backendUrl}${fotoPerfil}`;
    }

    // Actualizamos el objeto con la nueva ruta absoluta
    this.user = {
      ...user,
      fotoPerfil
    };

    console.log('Ruta de la imagen:', user.fotoPerfil); // ✅ Log correcto
  } else {
    this.user = null;
    console.warn('No hay usuario logueado');
  }
}
}