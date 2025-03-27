import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../interfaces/user'; // Importa la interfaz User
import { AuthService } from '../../services/authService/auth.service'; // Importamos el servicio Auth

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api/users'; // URL base de la API (ajusta según tu backend)

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
    fotoPerfil: 'public\images\defaultpic.jpg', // Imagen genérica para invitados
  };

  // Usuario actual (por defecto es el invitado)
  private currentUser: User = this.guestUser;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Obtener el usuario actual (puede ser el invitado o el usuario autenticado)
  getUser(): User {
    const authUser = this.authService.getCurrentUser();
    return authUser ? authUser : this.guestUser;
  }

  // Establecer el usuario actual desde la API
  setCurrentUserFromApi(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.currentUser = user; // Sobrescribe el usuario invitado con el usuario autenticado
      },
      error: (error: any) => {
        console.error('Error al obtener el usuario actual:', error);
        this.currentUser = this.guestUser; // Si falla, mantenemos al usuario invitado
      }
    });
  }

  // Actualizar el usuario actual
  updateUser(updatedUser: Partial<User>): void {
    this.currentUser = { ...this.currentUser, ...updatedUser }; // Actualiza solo las propiedades proporcionadas
    console.log('Usuario actualizado:', this.currentUser);
  }

  // ------------------- Métodos de la API -------------------

  // Obtener todos los usuarios desde la API
  getUsersFromApi(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Obtener un usuario por su ID desde la API
  getUserByIdFromApi(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Editar un usuario existente a través de la API
editUserInApi(id: number, updatedUser: FormData): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, updatedUser);
}

  // Eliminar un usuario a través de la API
  deleteUserFromApi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}