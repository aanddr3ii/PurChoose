import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user'; // Importa la interfaz User

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersKey = 'registeredUsers'; // Clave para almacenar usuarios en localStorage

  constructor() {
    // Inicializamos los usuarios en localStorage si no existen
    const storedUsers = this.getUsers();
    if (!storedUsers.length) {
      this.addUser(this.user); // Agregamos el usuario predeterminado
    }
  }

  private user: User = {
    id: 1,
    name: 'Yassine Riahi El Kihal',
    email: 'elpresi@elmuro.com',
    password: '123456789',
    role: 'usuario',
    fechaRegistro: new Date(),
    ubicacion: 'Barcelona',
    telefono: 12345678901,
    fotoPerfil: 'https://media.licdn.com/...',
  };

  // Obtener todos los usuarios registrados
  getUsers(): User[] {
    const storedUsers = localStorage.getItem(this.usersKey);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  // Guardar usuarios en localStorage
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  // Añadir un nuevo usuario
  addUser(newUser: User): void {
    const users = this.getUsers();
    users.push(newUser);
    this.saveUsers(users);
  }

  // Editar un usuario existente
  editUser(index: number, updatedUser: Partial<User>): void {
    const users = this.getUsers();
    users[index] = { ...users[index], ...updatedUser };
    this.saveUsers(users);
  }

  // Eliminar un usuario
  deleteUser(index: number): void {
    const users = this.getUsers();
    users.splice(index, 1);
    this.saveUsers(users);
  }

  // Obtener el usuario actual (renombrado de getUser)
  getUser(): User {
    return this.user;
  }

  // Verificar si un usuario es administrador
  isAdmin(email: string, password: string): boolean {
    const admin = this.getUsers().find(
      user => user.email === email && user.password === password && user.role === 'admin'
    );
    return !!admin; // Retorna true si el usuario es admin
  }

  // Obtener un usuario por su email
  getUserByEmail(email: string): User | undefined {
    return this.getUsers().find(user => user.email === email);
  }

  // Actualizar el usuario actual
  updateUser(updatedUser: Partial<User>): void {
    this.user = { ...this.user, ...updatedUser }; // Actualizamos solo las propiedades proporcionadas
    console.log('Usuario actualizado:', this.user);
  }
}