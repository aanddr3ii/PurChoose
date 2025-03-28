import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importamos CommonModule para usar DatePipe
import { User } from '../interfaces/user'; // Importamos la interfaz User
import { UserService } from '../services/userService/user.service'; // Importamos el servicio UserService

@Component({
  selector: 'app-info-perfil',
  standalone: true,
  imports: [CommonModule], // Aseguramos que los pipes globales estén disponibles
  templateUrl: './info-perfil.component.html',
  styleUrls: ['./info-perfil.component.css']
})
export class InfoPerfilComponent implements OnInit {
  @Input() user!: User; // Definimos el input para recibir el usuario desde el padre
  currentUser: User | null = null; // Usuario actual que se mostrará en la vista
  isLoading: boolean = false; // Estado para manejar la carga de datos

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Inicializamos el usuario actual con el valor recibido por @Input
    this.currentUser = { ...this.user };

    // Cargar los datos del usuario desde localStorage
    this.loadUserDataFromLocalStorage();
  }

  // Método para cargar los datos del usuario desde localStorage
  loadUserDataFromLocalStorage(): void {
    const localUser = this.userService.getUser(); // Obtener el usuario desde localStorage
    if (localUser) {
      this.currentUser = localUser; // Actualizar los datos del usuario
    } else {
      console.error('Error: No se encontró el usuario en localStorage.');
    }
  }

  // Método para formatear la fecha de registro
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }
}