import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  fullName?: string;
  email: string;
  password: string;
  role: 'client' | 'seller' | 'admin';
  dob?: string;
  phone?: string;
}

export interface PasswordResetRequest {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersKey = 'registeredUsers';
  private currentUserKey = 'currentUser';
  private resetRequestsKey = 'passwordResetRequests';

  // Usuarios mock iniciales
  private mockUsers: User[] = [
    { email: 'cliente@ejemplo.com', password: '123456', role: 'client' },
    { email: 'admin@admin.com', password: '123456', role: 'admin' }
  ];

  validateSecurityQuestion(email: string, answer: string): boolean {
    const users = this.getUsers();
    const user = users.find((u) => u.email === email);

    // Simulación de una pregunta de seguridad: La respuesta siempre es "rojo"
    if (user && answer.toLowerCase() === 'negro') {
      return true;
    }
    return false;
  }

  constructor(private router: Router) {
    // Inicializar usuarios si no existen
    if (!localStorage.getItem(this.usersKey)) {
      localStorage.setItem(this.usersKey, JSON.stringify(this.mockUsers));
    }

    // Inicializar solicitudes de restablecimiento si no existen
    if (!localStorage.getItem(this.resetRequestsKey)) {
      localStorage.setItem(this.resetRequestsKey, JSON.stringify([]));
    }
  }


  login(email: string, password: string): boolean {
    const storedUsers: User[] = this.getUsers();
    const user = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(user: User): boolean {
    const existingUsers: User[] = this.getUsers();

    if (existingUsers.some((u) => u.email === user.email)) {
      return false; // Email ya registrado
    }

    existingUsers.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(existingUsers));
    return true;
  }


  getUserRole(): string {
    const user = this.getCurrentUser();
    return user ? user.role : '';
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }


  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  requestPasswordReset(email: string): boolean {
    const users = this.getUsers();
    const user = users.find((u) => u.email === email);

    if (!user) return false;

    const resetRequests: PasswordResetRequest[] = this.getResetRequests();
    const token = this.generateResetToken();

    resetRequests.push({ email, token });
    localStorage.setItem(this.resetRequestsKey, JSON.stringify(resetRequests));

    // Aquí podrías enviar un correo simulado con el token
    console.log(`Simulación de correo enviado a ${email} con token: ${token}`);
    return true;
  }

  validateResetToken(email: string, token: string): boolean {
    const resetRequests: PasswordResetRequest[] = this.getResetRequests();
    return resetRequests.some(
      (req) => req.email === email && req.token === token
    );
  }


  resetPassword(email: string, newPassword: string): boolean {
    const users = this.getUsers();
    const userIndex = users.findIndex((u) => u.email === email);

    if (userIndex === -1) return false;

    // Actualizar la contraseña
    users[userIndex].password = newPassword;
    localStorage.setItem(this.usersKey, JSON.stringify(users));

    return true;
  }
  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }


  private getResetRequests(): PasswordResetRequest[] {
    return JSON.parse(localStorage.getItem(this.resetRequestsKey) || '[]');
  }


  private generateResetToken(): string {
    return Math.random().toString(36).substring(2, 15);
  }


  private getCurrentUser(): User | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }
}