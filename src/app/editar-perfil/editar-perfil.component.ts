import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { NavBeltComponent } from "../nav-belt/nav-belt.component";
import { NavCategoriesComponent } from '../nav-categories/nav-categories.component';
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  standalone  : true,
  imports: [ReactiveFormsModule, RouterModule, NavBeltComponent, NavCategoriesComponent],
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
  editForm!: FormGroup; // Formulario reactivo
  previewImage!: string | null; // Variable para mostrar una vista previa de la imagen

  // Datos del usuario
  user: User = {
    name: 'El Presidente',
    bio: 'soy un presidente naranja',
    avatar: 'https://s.france24.com/media/display/b1bb448c-d51e-11ef-bb54-005056a90284/w:1280/p:4x3/Trumpretratooficial.jpg',
    email: 'elpresi@elmuro.com',
    location: 'Washington D.C, USA',
    birthday: '01/01/1990',
    posts: 123,
    followers: 456,
    following: 789,
    rating: 3
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Inicializamos el formulario con los datos actuales del usuario
    this.editForm = this.fb.group({
      name: [this.user.name, Validators.required],
      bio: [this.user.bio],
      avatar: [''], // Campo para el archivo de imagen
      email: [this.user.email, [Validators.required, Validators.email]],
      location: [this.user.location],
      birthday: [this.user.birthday, Validators.required]
    });
  }

  // Método para seleccionar una nueva imagen de perfil
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.editForm.patchValue({ avatar: file }); // Actualizamos el campo "avatar"
      this.editForm.get('avatar')?.updateValueAndValidity();

      // Mostramos una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => (this.previewImage = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  // Método para guardar los cambios
  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedUser: User = this.editForm.value;
      console.log('Datos actualizados:', updatedUser);

      // Aquí puedes enviar los datos al servidor o actualizarlos localmente
      alert('Cambios guardados exitosamente.');
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}