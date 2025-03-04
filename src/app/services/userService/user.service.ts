import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user'; // Importamos la interfaz User


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User = {
    id: 1,
    name: 'Donald Trump', // Usamos 'nombre' en lugar de 'name'
    email: 'elpresi@elmuro.com',
    password: '123456789',
    role: 'usuario',
    registrationDate: new Date(), // Usamos 'fechaRegistro' en lugar de 'registrationDate'
    location: 'Washington D.C, USA', // Usamos 'ubicacion' en lugar de 'location'
    phone: 12345678901, // Usamos 'telefono' en lugar de 'phone'
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQBDkHzLb9cIwaLRa7MesbtBhq2MDBXMvonw&s', // Usamos 'fotoPerfil' en lugar de 'profilePicture'
  };

  getUser(): User {
    return this.user;
  }

  updateUser(updatedUser: Partial<User>): void {
    this.user = { ...this.user, ...updatedUser }; // Actualizamos solo las propiedades proporcionadas
    console.log('Usuario actualizado:', this.user);
  }
}