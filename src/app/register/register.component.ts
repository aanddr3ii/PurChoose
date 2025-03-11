import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, TranslateModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // Variable para el formulario de registro
  registerForm: FormGroup;

  // Array de códigos de país con su bandera correspondiente
  countryCodes = [
    { value: '+1', flag: '🇺🇸' },
    { value: '+351', flag: '🇵🇹' },
    { value: '+33', flag: '🇫🇷' },
    { value: '+34', flag: '🇪🇸' }
  ];

  // Configuración del formulario de registro
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]], 
      dob: ['', [Validators.required]], 
      countryCode: ['+1', [Validators.required]], 
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordsMatchValidator });
  }

  // Función para validar que las contraseñas coincidan
  private passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Función para manejar el envío del formulario y enseñarlo por consola
  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted:', this.registerForm.value);
    }
  }

}
