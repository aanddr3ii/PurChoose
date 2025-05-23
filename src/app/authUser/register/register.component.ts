import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageBarComponent } from "../language-bar/language-bar.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule, LanguageBarComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  countryCodes = [
    { value: '+1', flag: '🇺🇸' },
    { value: '+34', flag: '🇪🇸' },
    { value: '+351', flag: '🇵🇹' },
    { value: '+33', flag: '🇫🇷' }
  ];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      prefijo: ['+34', Validators.required], // Código de país
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]], // Número de teléfono sin prefijo
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador personalizado para contraseñas
  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      // Imprimir los datos que se enviarán a Laravel
      console.log('Datos enviados al backend:', userData);

      // Llamar al servicio para registrar al usuario
      this.auth.register(userData).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          // Redirigir al usuario al formulario de inicio de sesión
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al registrar:', error);
          if (error.status === 422) {
            // Mostrar error de validación (por ejemplo, email duplicado)
            const validationErrors = error.error.errors;
            for (const field in validationErrors) {
              this.registerForm.get(field)?.setErrors({ serverError: validationErrors[field][0] });
            }
          } else {
            alert('Error al registrar. Inténtalo de nuevo.');
          }
        }
      });
    }
  }
}