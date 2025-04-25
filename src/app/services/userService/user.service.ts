import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'; // Importamos los operadores map y tap
import { User } from '../../interfaces/user'; // Importa la interfaz User
import { AuthService } from '../../services/authService/auth.service'; // Importamos el servicio Auth
import { ApiUrls } from '../../Shared/api-urls'; // Importamos las URLs de la API

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendUrl = 'http://localhost:8000'; // URL base del backend

  // Usuario invitado predeterminado
  private guestUser: User = {
    id: 0, // ID especial para el usuario invitado
    name: 'Invitado',
    email: 'invitado@example.com',
    password: '', // No tiene contraseña
    role: 'guest', // Rol específico para invitados
    fechaRegistro: new Date(),
    ubicacion: '',
    telefono: 100200300, // Número de teléfono genérico
    fotoPerfil: `${this.backendUrl}/images/defaultpic.jpg`, // Imagen genérica para invitados
  };

  // Usuario actual (por defecto es el invitado)
  private currentUser: User = this.guestUser;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Obtener el usuario actual (puede ser el invitado o el usuario autenticado)
  getUser(): User {
    const authUser = this.authService.getCurrentUser();
    return authUser ? authUser : this.guestUser;
  }

  async setCurrentUserFromApi(): Promise<void> {
    try {
      const userId = this.authService.getUserId();
      if (!userId) {
        console.error('Error: No se encontró un ID de usuario válido.');
        this.currentUser = this.guestUser;
        return;
      }

      const user = await this.getUserByIdFromApi(userId).toPromise();
      this.currentUser = user || this.guestUser;
    } catch (error) {
      console.error('Error al obtener el usuario actual desde la API:', error);
      this.currentUser = this.guestUser; // Si falla, mantenemos al usuario invitado
    }
  }

  // Ajustar la URL de la imagen para incluir el prefijo del backend
  private adjustImageUrl(user: User): User {
    if (user.fotoPerfil && !user.fotoPerfil.startsWith('http')) {
      user.fotoPerfil = `${this.backendUrl}${user.fotoPerfil}`;
    }
    console.log('URL ajustada:', user.fotoPerfil); // Imprime la URL ajustada
    return user;
  }

  // Actualizar el usuario actual en el servicio
  updateCurrentUser(updatedUser: User): void {
    this.currentUser = { ...this.currentUser, ...updatedUser };
  }

  // ------------------- Métodos de la API -------------------

  // Obtener todos los usuarios desde la API
  getUsersFromApi(): Observable<User[]> {
    return this.http.get<User[]>(`${ApiUrls.BASE_URL}/usuarios`);
  }

  // Obtener un usuario por su ID desde la API
  getUserByIdFromApi(id: number): Observable<User> {
    return this.http.get<{ success: boolean; user: User }>(ApiUrls.USUARIO.SHOW(id)).pipe(
      tap((response) => {
        console.log('Datos originales del backend:', response.user); // Imprime los datos originales
      }),
      map((response) => {
        const user = response.user;
        return this.adjustImageUrl(user); // Ajusta la URL de la imagen
      })
    );
  }

  // Editar un usuario existente a través de la API
  editUserInApi(id: number, updatedUser: any): Observable<any> {
    return this.http.put(ApiUrls.USUARIO.UPDATE(id), updatedUser, {
      headers: { 'Content-Type': 'application/json' }, // Especifica que enviamos JSON
    });
  }

  // Eliminar un usuario a través de la API
  deleteUserFromApi(id: number): Observable<void> {
    return this.http.delete<void>(`${ApiUrls.BASE_URL}/usuario/${id}`);
  }
}