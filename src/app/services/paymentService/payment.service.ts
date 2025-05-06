import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // Datos simulados de tarjetas bancarias
  private tarjetas: { numero: string; tipo: string; fechaExpiracion: string; cvc: string }[] = [];

  // Datos simulados de servicios de pago
  private serviciosPago: { nombre: string; email: string }[] = [];

  constructor() {
    // Simulamos datos iniciales
    this.tarjetas = [
      { numero: '**** **** **** 1234', tipo: 'Visa', fechaExpiracion: '12/25', cvc: '123' },
      { numero: '**** **** **** 5678', tipo: 'Mastercard', fechaExpiracion: '03/26', cvc: '456' }
    ];

    this.serviciosPago = [
      { nombre: 'PayPal', email: 'usuario@paypal.com' },
      { nombre: 'Stripe', email: 'usuario@stripe.com' }
    ];
  }

  // Métodos para gestionar tarjetas

  getTarjetas(): { numero: string; tipo: string; fechaExpiracion: string; cvc: string }[] {
    return this.tarjetas;
  }

  addOrUpdateTarjeta(tarjeta: { tipo: string; numero: string; fechaExpiracion: string; cvc: string }, index?: number): void {
    if (index !== undefined) {
      // Edición de tarjeta existente
      this.tarjetas[index] = tarjeta;
    } else {
      // Creación de nueva tarjeta (sin restricciones de duplicados)
      this.tarjetas.push(tarjeta);
    }
    alert('Tarjeta guardada exitosamente.');
  }

  deleteTarjeta(index: number): void {
    this.tarjetas.splice(index, 1);
    alert('Tarjeta eliminada exitosamente.');
  }

  // Métodos para gestionar servicios de pago

  getServiciosPago(): { nombre: string; email: string }[] {
    return this.serviciosPago;
  }

  addOrUpdateServicio(servicio: { nombre: string; email: string }, index?: number): void {
    if (index !== undefined) {
      // Edición de servicio existente
      this.serviciosPago[index] = servicio;
    } else {
      // Creación de nuevo servicio
      if (this.servicioYaExiste(servicio.nombre)) {
        alert('Este servicio ya está registrado.');
        return;
      }
      this.serviciosPago.push(servicio);
    }
    alert('Servicio de pago guardado exitosamente.');
  }

  deleteServicio(index: number): void {
    this.serviciosPago.splice(index, 1);
    alert('Servicio de pago eliminado exitosamente.');
  }

  servicioYaExiste(nombre: string): boolean {
    return this.serviciosPago.some((servicio) => servicio.nombre === nombre);
  }
}