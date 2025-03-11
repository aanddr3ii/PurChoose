import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isPasswordVisible = false;
  invalidCredentials = false; // Nueva propiedad para errores

  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
      ]]
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    const inputType = this.isPasswordVisible ? 'text' : 'password';
    this.passwordInput.nativeElement.setAttribute('type', inputType);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      if (this.auth.login(email, password)) {
        this.router.navigate(['/']); // Redirige a home
      } else {
        this.invalidCredentials = true;
        setTimeout(() => this.invalidCredentials = false, 3000);
      }
    }
  }
}