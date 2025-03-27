import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isPasswordVisible = false; // Variable para controlar la visibilidad de la contraseña
  invalidCredentials = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Función para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      console.log('Enviando credenciales:', { email, password });

      // Llamar al servicio para iniciar sesión
      this.auth.login(email, password).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso:', response);

          // Imprimir los datos del usuario en la consola
          console.log('Datos del usuario obtenidos:', response.user);

          // Guardar el usuario y el token en localStorage
          this.auth.setCurrentUser(response.user, response.token);

          // Redirigir al dashboard o página principal
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          this.invalidCredentials = true;
          setTimeout(() => (this.invalidCredentials = false), 3000); // Mostrar mensaje de error durante 3 segundos
        }
      });
    } else {
      console.error('El formulario no es válido:', this.loginForm.errors);
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}