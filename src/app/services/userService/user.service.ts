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
    location: 'Washington D.C, USA', // Usamos 'ubicacion' en lugar de 'location'
    phone: 12345678901, // Usamos 'telefono' en lugar de 'phone'
    profilePicture: 'https://media.licdn.com/dms/image/v2/D5603AQHyYxdhP8mV2Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1719498858263?e=1746662400&v=beta&t=xnDUsAahOKC7h71UEz88i_eXIP5gjH6s9jiTbPlGCzs', // Usamos 'fotoPerfil' en lugar de 'profilePicture'
  };

  getUser(): User {
    return this.user;
  }

  updateUser(updatedUser: Partial<User>): void {
    this.user = { ...this.user, ...updatedUser }; // Actualizamos solo las propiedades proporcionadas
    console.log('Usuario actualizado:', this.user);
  }
}