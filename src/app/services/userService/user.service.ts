import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user'; // Importamos la interfaz User

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User = {
    id: 1,
    name: 'Yassine Riahi El Kihal', // Usamos 'nombre' en lugar de 'name'
    email: 'elpresi@elmuro.com',
    password: '123456789',
    role: 'usuario',
    registrationDate: new Date(), // Usamos 'fechaRegistro' en lugar de 'registrationDate'
    location: 'Barcelona', // Usamos 'ubicacion' en lugar de 'location'
    phone: 12345678901, // Usamos 'telefono' en lugar de 'phone'
    profilePicture: 'https://media.licdn.com/dms/image/v2/D5603AQHyYxdhP8mV2Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1719498858263?e=1746662400&v=beta&t=xnDUsAahOKC7h71UEz88i_eXIP5gjH6s9jiTbPlGCzs', // Usamos 'fotoPerfil' en lugar de 'profilePicture'
  };


  private usersKey = 'registeredUsers'; // Clave para almacenar usuarios en localStorage

  constructor() {
    // Inicializamos los usuarios en localStorage si no existen
    const storedUsers = this.getUsers();
    if (!storedUsers.length) {
      this.addUser(this.user); // Agregamos el usuario predeterminado
    }
  }
  getUser(): User {
    return this.user;
  }
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

  // Obtener el usuario actual (el que ya estaba definido)
  getCurrentUser(): User {
    return this.user;
  }

  // Actualizar el usuario actual (el que ya estaba definido)
  updateUser(updatedUser: Partial<User>): void {
    this.user = { ...this.user, ...updatedUser }; // Actualizamos solo las propiedades proporcionadas
    console.log('Usuario actualizado:', this.user);
  }
}