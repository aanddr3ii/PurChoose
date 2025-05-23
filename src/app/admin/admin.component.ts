import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService/auth.service'; // Importa el servicio de autenticación
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavBeltComponent } from "../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../nav-categories/nav-categories.component";
import { app } from '../../../server';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TranslateModule, NavBeltComponent, NavCategoriesComponent, NavBeltComponent,NavCategoriesComponent], 
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isAdmin = false; // Propiedad para verificar si el usuario es admin

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verifica si el usuario es admin
    this.isAdmin = this.authService.getUserRole() === 'admin';

    // Si el usuario no es admin, redirige al login
    if (!this.isAdmin) {
      this.router.navigate(['/login']);
    }
  }
  // Método para navegar a la gestión de usuarios
  navigateToManageUsers(): void {
    this.router.navigate(['/admin/manage-users']);
  }

  // Método para navegar a la gestión de categorías
  navigateToManageCategories(): void {
    this.router.navigate(['/admin/manage-categories']);
  }

  // Método para navegar a la gestión de productos
  navigateToManageProducts(): void {
    this.router.navigate(['/admin/manage-products']);
  
  }
}