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
  isPasswordVisible = false;
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

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Llamar al servicio para iniciar sesión
      this.auth.login(email, password).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso:', response);

          // Guardar el usuario y el token en localStorage
          this.auth.setCurrentUser(response.user, response.token);

          // Redirigir según el rol del usuario
          const role = this.auth.getUserRole();
          if (role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          this.invalidCredentials = true;
          setTimeout(() => (this.invalidCredentials = false), 3000); // Mostrar mensaje de error durante 3 segundos
        }
      });
    }
  }
}