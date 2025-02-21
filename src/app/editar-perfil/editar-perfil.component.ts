import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/userService/user.service';
import { NavBeltComponent } from "../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from "../nav-categories/nav-categories.component";

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NavBeltComponent, NavCategoriesComponent],
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
  editForm!: FormGroup; // Formulario reactivo
  previewImage!: string | null; // Variable para mostrar una vista previa de la imagen
  user!: User; // Propiedad para almacenar el usuario actual

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getUser(); // Obtenemos el usuario actual desde el servicio

    // Inicializamos el formulario con los datos actuales del usuario
    this.editForm = this.fb.group({
      nombre: [this.user.name, Validators.required], // Campo obligatorio
      ubicacion: [this.user.location || '', []], // Campo opcional
      telefono: [this.user.phone || null, [Validators.required, Validators.pattern(/^\d{10}$/)]], // Validación básica para teléfono (10 dígitos)
      email: [this.user.email, [Validators.required, Validators.email]], // Campo obligatorio
      fotoPerfil: [this.user.profilePicture || null], // Campo para el archivo de imagen
    });
  }

  // Método para seleccionar una nueva imagen de perfil
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.editForm.patchValue({ fotoPerfil: file }); // Actualizamos el campo "fotoPerfil"
      this.editForm.get('fotoPerfil')?.updateValueAndValidity();

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

      // Verificamos si el valor de fotoPerfil es un archivo válido
      const fotoPerfilValue = this.editForm.get('fotoPerfil')?.value;
      if (fotoPerfilValue && !(fotoPerfilValue instanceof File)) {
        delete updatedUserData.profilePicture; // Eliminamos la propiedad si no es un archivo
      }

      // Actualizamos el usuario en el servicio
      this.userService.updateUser(updatedUserData);

      // Si hay una imagen seleccionada, la manejamos por separado
      if (fotoPerfilValue instanceof File) {
        this.handleImageUpload(fotoPerfilValue as File);
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