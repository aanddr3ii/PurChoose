import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TranslateModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Variable para el formulario de inicio de sesión
  loginForm: FormGroup;

  // Configuramos el formulario con los campos de correo electrónico y contraseña
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Campo de correo electrónico con validación
      password: ['', [Validators.required, Validators.minLength(6)]] // Campo de contraseña con validación y longitud mínima
    });
  }
  // Función para manejar el envío del formulario y enseñarlo por consola
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario enviado:', this.loginForm.value);
    }
  }
}
