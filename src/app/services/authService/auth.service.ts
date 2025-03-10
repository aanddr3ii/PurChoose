import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { email: 'cliente@ejemplo.com', password: 'Cliente123', role: 'client' },
    { email: 'vendedor@ejemplo.com', password: 'Vendedor456', role: 'seller' }
  ];

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    const user = this.users.find(u => 
      u.email === email && u.password === password
    );
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }
  
  // Agregar método para obtener el rol
  getUserRole(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : '';
  }
  
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}