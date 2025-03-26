import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrls } from '../../Shared/api-urls'; // Importamos las URLs de la API

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserKey = 'currentUser';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  // Registrar un nuevo usuario
  register(user: any): Observable<any> {
    return this.http.post(ApiUrls.AUTH.REGISTER, user);
  }

  // Iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.http.post(ApiUrls.AUTH.LOGIN, { email, password });
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    localStorage.removeItem(this.tokenKey);
  }

  // Guardar el usuario y el token en localStorage
  setCurrentUser(user: any, token: string): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    localStorage.setItem(this.tokenKey, token);
  }

  // Obtener el usuario actual almacenado en localStorage
  getCurrentUser(): any {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  // Obtener el token de autenticación almacenado en localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Obtener el rol del usuario actual
  getUserRole(): string {
    const user = this.getCurrentUser();
    return user ? user.role : '';
  }
   // Validar pregunta de seguridad
   validateSecurityQuestion(email: string, answer: string): Observable<any> {
    return this.http.post(`${ApiUrls.BASE_URL}/validate-security-question`, { email, answer });
  }

  // Restablecer contraseña
  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post(`${ApiUrls.BASE_URL}/reset-password`, { email, newPassword });
  }
}