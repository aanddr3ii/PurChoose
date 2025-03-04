import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/userService/user.service';
import { NavBeltComponent } from "../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../nav-categories/nav-categories.component";
import { MetodosPagoComponentComponent } from '../metodos-pago-component/metodos-pago-component.component';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NavBeltComponent, NavCategoriesComponent, MetodosPagoComponentComponent],
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
  editForm!: FormGroup; // Formulario reactivo
  previewImage!: string | null; // Variable para mostrar una vista previa de la imagen
  prefixes = [
    { value: '+1', flag: '🇺🇸' },
    { value: '+351', flag: '🇵🇹' },
    { value: '+33', flag: '🇫🇷' },
    { value: '+34', flag: '🇪🇸' }
  ]; // Lista de prefijos
  user!: User; // Propiedad para almacenar el usuario actual
  activeTab: 'perfil' | 'metodos-pago' = 'perfil'; // Propiedad para gestionar las pestañas

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getUser(); // Obtenemos el usuario actual desde el servicio

    // Inicializamos el formulario con los datos actuales del usuario
    this.editForm = this.fb.group({
      name: [this.user.name, Validators.required], // Campo obligatorio
      location: [this.user.location || '', []], // Campo opcional
      phone: [this.user.phone || null, [Validators.required, Validators.pattern(/^\d{9}$/)]], // Validación básica para teléfono (9 dígitos sin prefijo)
      email: [this.user.email, [Validators.required, Validators.email]], // Campo obligatorio
      profilePicture: [this.user.profilePicture || null], // Campo para el archivo de imagen
      prefijo: ['+34', Validators.required], // Prefijo telefónico con validación
      password: ['', []] // Campo para la contraseña (sin validación por ahora)
    });
  }

  // Método para seleccionar una nueva imagen de perfil
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.editForm.patchValue({ profilePicture: file }); // Actualizamos el campo "profilePicture"
      this.editForm.get('profilePicture')?.updateValueAndValidity();

      // Mostramos una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => (this.previewImage = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  // Método para guardar los cambios
  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedUserData: Partial<User> = this.editForm.value;

      // Concatenamos el prefijo y el número de teléfono antes de guardar
      const fullPhoneNumber = `${this.editForm.value.prefijo}${this.editForm.value.phone}`;
      updatedUserData.phone = parseInt(fullPhoneNumber, 10); // Guardamos el número completo

      // Verificamos si el valor de profilePicture es un archivo válido
      const profilePictureValue = this.editForm.get('profilePicture')?.value;
      if (profilePictureValue && !(profilePictureValue instanceof File)) {
        delete updatedUserData.profilePicture; // Eliminamos la propiedad si no es un archivo
      }

      // Actualizamos el usuario en el servicio
      this.userService.updateUser(updatedUserData);

      // Si hay una imagen seleccionada, la manejamos por separado
      if (profilePictureValue instanceof File) {
        this.handleImageUpload(profilePictureValue as File);
      }

      alert('Cambios guardados exitosamente.');
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }

  // Método para manejar la subida de la imagen (simulado)
  handleImageUpload(file: File): void {
    console.log('Subiendo nueva imagen:', file);

    // Convertimos el archivo a base64 y actualizamos el servicio
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;
      this.userService.updateUser({ profilePicture: base64Image });
    };
    reader.readAsDataURL(file);
  }
}