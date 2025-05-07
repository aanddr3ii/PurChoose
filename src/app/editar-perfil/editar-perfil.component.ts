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
    { value: '+34', flag: '🇪🇸' },
  ]; // Lista de prefijos telefónicos
  user!: User; // Propiedad para almacenar el usuario actual
  activeTab: 'perfil' | 'metodos-pago' = 'perfil'; // Pestaña activa por defecto

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser(); // Obtenemos el usuario actual desde el servicio

    if (this.user.fotoPerfil && !this.user.fotoPerfil.startsWith('http')) {
      const backendUrl = 'http://localhost:8000'; // URL base del backend
      this.user.fotoPerfil = `${backendUrl}${this.user.fotoPerfil}`;
    }
    console.log('URL de la imagen ajustada:', this.user.fotoPerfil);

    // Inicializamos el formulario con los datos actuales del usuario
    this.editForm = this.fb.group({
      name: [this.user.name, Validators.required], // Campo obligatorio
      location: [this.user.ubicacion || '', Validators.required], // Ubicación (obligatoria)
      phone: [this.user.telefono?.toString().slice(3) || null, [Validators.required, Validators.pattern(/^\d{9}$/)]], // Teléfono sin prefijo
      email: [this.user.email, [Validators.required, Validators.email]], // Email (obligatorio)
      profilePicture: [this.user.fotoPerfil || null], // Campo para el archivo de imagen
      prefijo: ['+34', Validators.required], // Prefijo telefónico con validación
      password: [''], // Campo para la contraseña (opcional)
      password_confirmation: [''], // Confirmación de contraseña (opcional)
    });

    // Validación condicional para password_confirmation
    this.editForm.get('password')?.valueChanges.subscribe((value) => {
      if (value) {
        this.editForm.get('password_confirmation')?.setValidators([Validators.required]);
      } else {
        this.editForm.get('password_confirmation')?.clearValidators();
      }
      this.editForm.get('password_confirmation')?.updateValueAndValidity();
    });
  }

  // Método para seleccionar una nueva imagen de perfil
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Mostramos una vista previa de la imagen
      const readerPreview = new FileReader();
      readerPreview.onload = () => (this.previewImage = readerPreview.result as string);
      readerPreview.readAsDataURL(file);

      // Convertimos la imagen a Base64 para enviarla al backend
      const readerBase64 = new FileReader();
      readerBase64.onload = () => {
        const base64String = readerBase64.result as string;
        this.editForm.patchValue({ profilePicture: base64String }); // Actualizamos el campo "profilePicture"
        this.editForm.get('profilePicture')?.updateValueAndValidity();
      };
      readerBase64.readAsDataURL(file);
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

      const formValues = this.editForm.value;

      // Construir el objeto JSON con los datos a enviar
      const updatedUserData = {
        name: formValues.name,
        email: formValues.email,
        prefijo: formValues.prefijo,
        telefono: formValues.phone ? `${formValues.prefijo}${formValues.phone}` : null, // Concatenar prefijo y teléfono
        ubicacion: formValues.location,
        fotoPerfil: formValues.profilePicture || null, // Imagen codificada en Base64
        password: formValues.password || null, // Solo incluir si se proporciona
        password_confirmation: formValues.password_confirmation || null, // Solo incluir si se proporciona
      };

      console.log('Datos enviados al backend:', updatedUserData);

      // Enviamos los datos al backend como JSON
      this.userService.editUserInApi(this.user.id, updatedUserData).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);

          // Actualizar el usuario actual en localStorage
          const updatedUser = response.user; // Asegúrate de que el backend devuelve los datos actualizados
          this.userService.updateCurrentUser(updatedUser);

          // Mostrar mensaje de éxito
          this.showSuccessPopup('¡Cambios guardados exitosamente!');
        },
        error: (error) => {
          console.error('Error al actualizar el perfil:', error);
          if (error.error && error.error.message) {
            this.showErrorPopup(error.error.message); // Mostrar mensaje detallado del backend
          } else {
            this.showErrorPopup('Ocurrió un error inesperado.');
          }
        },
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