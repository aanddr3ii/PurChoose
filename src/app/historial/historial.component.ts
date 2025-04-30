import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../services/Historial/historial.service'; // Importamos el servicio de historial


@Component({
  selector: 'app-historial',
  standalone: true,
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {
  historial: any[] = []; // Array para almacenar los registros del historial

  constructor(private historialService: HistorialService) {}

  ngOnInit(): void {
    const userId = 1; // Reemplaza con el ID del usuario actual
    this.historialService.getHistorial(userId).subscribe({
      next: (response) => {
        this.historial = response.data; // Asignar los registros del historial obtenidos
      },
      error: (error) => {
        console.error('Error al cargar el historial:', error);
      },
    });
  }

  deleteItem(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.historialService.deleteHistorial(id).subscribe({
        next: () => {
          this.historial = this.historial.filter((item) => item.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar el registro:', error);
        },
      });
    }
  }

  updateItem(id: number, data: any): void {
    this.historialService.updateHistorial(id, data).subscribe({
      next: (response) => {
        const index = this.historial.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.historial[index] = { ...this.historial[index], ...data };
        }
      },
      error: (error) => {
        console.error('Error al actualizar el registro:', error);
      },
    });
  }
}