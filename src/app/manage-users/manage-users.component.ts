import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
import { NavBeltComponent } from '../nav-belt/nav-belt.component';

// Servicio Admin
import { AdminService } from '../services/admin/admin.service'; // Ajusta la ruta si es necesario

export interface User {
  id?: number; // Nuevo campo
  fullName?: string;
  email: string;
  password: string;
  role: 'usuario' | 'empresaurio' | 'admin'; // Cambiado a los roles reales de Laravel
  dob?: string;
  phone?: string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  standalone: true,
  imports: [TranslateModule, FormsModule, NavCategoriesComponent, NavBeltComponent],
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  newUser: User = { email: '', password: '', role: 'usuario' };
  editingUserIndex: number | null = null;

  constructor(
    private router: Router,
    private adminService: AdminService // Inyectamos el servicio
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Cargar usuarios desde la API
  private loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.map((user: any) => ({
          id: user.id,
          fullName: user.name, // Mapea el nombre del usuario
          email: user.email,
          password: '', // No mostramos contraseñas
          role: user.role || 'usuario',
          dob: user.fechaRegistro ? new Date(user.fechaRegistro).toISOString().split('T')[0] : undefined,
          phone: user.telefono || undefined
        }));
      },
      error: (err) => {
        console.error('Error cargando usuarios:', err);
        alert('No se pudieron cargar los usuarios');
      }
    });
  }

  // Agregar un nuevo usuario
  addUser(): void {
    if (!this.newUser.email || !this.newUser.password) {
      alert('Todos los campos obligatorios deben estar completos.');
      return;
    }

    const payload = {
      name: this.newUser.fullName || '',
      email: this.newUser.email,
      password: this.newUser.password,
      role: this.newUser.role,
      telefono: this.newUser.phone || '',
      fechaRegistro: this.newUser.dob || ''
    };

    this.adminService.createUser(payload).subscribe({
      next: (user) => {
        this.users.push({
          id: user.id,
          fullName: user.name,
          email: user.email,
          password: '',
          role: user.role,
          dob: user.fechaRegistro,
          phone: user.telefono
        });
        this.newUser = { email: '', password: '', role: 'usuario' };
      },
      error: (err) => {
        console.error('Error creando usuario:', err);
        alert('Hubo un error al crear el usuario');
      }
    });
  }

  // Editar un usuario existente
  editUser(index: number): void {
    this.editingUserIndex = index;
    const userToEdit = this.users[index];
    this.newUser = { ...userToEdit };
  }

  // Guardar cambios al editar un usuario
  saveEditedUser(): void {
    if (this.editingUserIndex !== null && this.newUser.id) {
      const userId = this.newUser.id;

      const payload = {
        name: this.newUser.fullName || '',
        email: this.newUser.email,
        password: this.newUser.password,
        role: this.newUser.role,
        telefono: this.newUser.phone || '',
        fechaRegistro: this.newUser.dob || ''
      };

      this.adminService.updateUser(userId, payload).subscribe({
        next: (updatedUser) => {
          this.users[this.editingUserIndex!] = {
            id: updatedUser.id,
            fullName: updatedUser.name,
            email: updatedUser.email,
            password: '',
            role: updatedUser.role,
            dob: updatedUser.fechaRegistro,
            phone: updatedUser.telefono
          };
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Error actualizando usuario:', err);
          alert('Hubo un error al actualizar el usuario');
        }
      });
    }
  }

  // Cancelar edición
  cancelEdit(): void {
    this.editingUserIndex = null;
    this.newUser = { email: '', password: '', role: 'usuario' };
  }

  // Eliminar un usuario
  deleteUser(index: number): void {
    const userId = this.users[index].id;
    if (!userId) return;

    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.adminService.deleteUser(userId).subscribe({
        next: () => {
          this.users.splice(index, 1);
        },
        error: (err) => {
          console.error('Error eliminando usuario:', err);
          alert('Hubo un error al eliminar el usuario');
        }
      });
    }
  }

  backToAdminMenu(): void {
    this.router.navigate(['/admin']);
  }
}