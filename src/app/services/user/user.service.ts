import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [
    {id:1, name: 'Aleix Diaz Sancho', email:'aleix@gmail.com', password: '1234',role: 'usuario', ubicacion: 'Lerida', telefono: 623426379, fotoPerfil: 'https://media.licdn.com/dms/image/v2/D4D03AQHZUtDMwvW49w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1696004719195?e=2147483647&v=beta&t=zYv2c3HUsY1n9gSlk-ll0MoWictwpiixi-5nEce20H0'},
    {id:3, name: 'Yassine Riahi El Kihal', email:'yassine@gmail.com', password: '1234',role: 'usuario', ubicacion: 'Barcelona', telefono: 627416379, fotoPerfil: 'https://media.licdn.com/dms/image/v2/D5603AQHyYxdhP8mV2Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719498858258?e=2147483647&v=beta&t=k2WoJyiwPQnDjvjr9wvnazb1eGIL519yW_sxjdujmtI'},
    {id:2, name: 'David', email:'david@gmail.com', password: '1234',role: 'usuario', ubicacion: 'Valencia',telefono: 621435383, fotoPerfil: 'https://humanidades.com/wp-content/uploads/2024/01/Rey-David.jpg'}
  ];

  getUser(): User[] {
    return this.users;
  }
}
