import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  imports: [TranslateModule,ReactiveFormsModule],
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotForm!: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      securityAnswer: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      const email = this.forgotForm.value.email;
      const securityAnswer = this.forgotForm.value.securityAnswer;

      if (this.auth.validateSecurityQuestion(email, securityAnswer)) {
        this.successMessage = 'Prueba de seguridad completada. Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/reset-password'], { queryParams: { email } });
        }, 2000);
      } else {
        this.errorMessage = 'La respuesta a la prueba de seguridad es incorrecta.';
      }
    }
  }
}