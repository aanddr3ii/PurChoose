import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { NavBeltComponent } from '../nav-belt/nav-belt.component';

export interface User {
  fullName?: string;
  email: string;
  password: string;
  role: 'client' | 'seller' | 'admin';
  dob?: string;
  phone?: string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  standalone: true,
  imports: [TranslateModule,FormsModule,NavCategoriesComponent,NavBeltComponent],
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  newUser: User = { email: '', password: '', role: 'client' };
  editingUserIndex: number | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Cargar usuarios desde localStorage
  private loadUsers(): void {
    const storedUsers = localStorage.getItem('registeredUsers');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
  }

  // Guardar usuarios en localStorage
  private saveUsers(): void {
    localStorage.setItem('registeredUsers', JSON.stringify(this.users));
  }

  // Agregar un nuevo usuario
  addUser(): void {
    if (!this.newUser.email || !this.newUser.password) {
      alert('Todos los campos son obligatorios.');
      return;
    }
    this.users.push({ ...this.newUser });
    this.saveUsers();
    this.newUser = { email: '', password: '', role: 'client' }; // Limpiar formulario
  }

  // Editar un usuario existente
  editUser(index: number): void {
    this.editingUserIndex = index;
    this.newUser = { ...this.users[index] };
  }
  backToAdminMenu(): void {
    this.router.navigate(['/admin']);
  }
  // Guardar cambios al editar un usuario
  saveEditedUser(): void {
    if (this.editingUserIndex !== null && this.newUser.email && this.newUser.password) {
      this.users[this.editingUserIndex] = { ...this.newUser };
      this.saveUsers();
      this.cancelEdit();
    } else {
      alert('Todos los campos son obligatorios.');
    }
  }

  // Cancelar edición
  cancelEdit(): void {
    this.editingUserIndex = null;
    this.newUser = { email: '', password: '', role: 'client' };
  }

  // Eliminar un usuario
  deleteUser(index: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.users.splice(index, 1);
      this.saveUsers();
    }
  }
}