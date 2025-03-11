import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  fullName?: string;
  email: string;
  password: string;
  role: 'client' | 'seller';
  dob?: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersKey = 'registeredUsers';
  
  // Usuarios mock iniciales
  private mockUsers: User[] = [
    { email: 'cliente@ejemplo.com', password: 'Cliente123', role: 'client' },
    { email: 'vendedor@ejemplo.com', password: 'Vendedor456', role: 'seller' }
  ];

  constructor(private router: Router) {
    // Inicializar usuarios si no existen
    if (!localStorage.getItem(this.usersKey)) {
      localStorage.setItem(this.usersKey, JSON.stringify(this.mockUsers));
    }
  }

  login(email: string, password: string): boolean {
    const storedUsers: User[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const user = storedUsers.find(u => 
      u.email === email && u.password === password
    );
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(user: User): boolean {
    const existingUsers: User[] = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    
    if (existingUsers.some(u => u.email === user.email)) {
      return false; // Email ya registrado
    }
    
    existingUsers.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(existingUsers));
    return true;
  }

  getUserRole(): string {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user).role : '';
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}