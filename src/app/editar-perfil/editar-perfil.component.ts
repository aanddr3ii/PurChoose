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
  imports: [ReactiveFormsModule, RouterModule, NavBeltComponent, NavCategoriesComponent,MetodosPagoComponentComponent],
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
  activeTab: 'perfil' | 'metodos-pago' = 'perfil'; // Pestaña activa por defecto

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getUser(); // Obtenemos el usuario actual desde el servicio

    // Inicializamos el formulario con los datos actuales del usuario
    this.editForm = this.fb.group({
      name: [this.user.name, Validators.required], // Campo obligatorio
      location: [this.user.ubicacion || '', [Validators.required]], // Ubicación (obligatoria)
      phone: [this.user.telefono?.toString().slice(3) || null, [Validators.required, Validators.pattern(/^\d{9}$/)]], // Teléfono sin prefijo
      email: [this.user.email, [Validators.required, Validators.email]], // Email (obligatorio)
      profilePicture: [this.user.fotoPerfil || null], // Campo para el archivo de imagen
      prefijo: ['+34', Validators.required], // Prefijo telefónico con validación
      password: ['', []], // Campo para la contraseña (opcional)
      password_confirmation: ['', []] // Confirmación de contraseña (opcional)
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
      // Verificamos que el ID del usuario exista
      if (!this.user.id) {
        this.showErrorPopup('Error: No se encontró el ID del usuario.');
        return;
      }

      const formData = new FormData(); // Usamos FormData para manejar archivos
      const formValues = this.editForm.value;

      // Agregamos los datos al FormData
      formData.append('name', formValues.name);
      formData.append('email', formValues.email);
      formData.append('prefijo', formValues.prefijo);
      formData.append('telefono', formValues.phone); // Solo el número sin prefijo
      formData.append('ubicacion', formValues.location);

      // Agregamos la imagen si está presente
      if (formValues.profilePicture instanceof File) {
        formData.append('fotoPerfil', formValues.profilePicture);
      }

      // Agregamos la contraseña solo si se proporciona
      if (formValues.password) {
        formData.append('password', formValues.password);
        formData.append('password_confirmation', formValues.password_confirmation);
      }

      console.log('Datos enviados al backend:', formData);

      // Enviamos los datos al backend
      this.userService.editUserInApi(this.user.id, formData).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.showSuccessPopup('¡Cambios guardados exitosamente!');
        },
        error: (error) => {
          console.error('Error al actualizar el perfil:', error);
          if (error.error && error.error.message) {
            this.showErrorPopup(error.error.message); // Mostrar mensaje detallado del backend
          } else {
            this.showErrorPopup('Ocurrió un error inesperado.');
          }
        }
      });
    } else {
      this.showErrorPopup('Por favor, completa todos los campos obligatorios.');
    }
  }

  // Método para mostrar un popup de éxito
  showSuccessPopup(message: string): void {
    alert(message); // Puedes reemplazar esto con un componente de popup personalizado
  }

  // Método para mostrar un popup de error
  showErrorPopup(message: string): void {
    alert(message); // Puedes reemplazar esto con un componente de popup personalizado
  }
}