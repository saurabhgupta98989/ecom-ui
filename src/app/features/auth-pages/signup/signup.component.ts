import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
  ],
})
export class SignupComponent {
  public loading = false;
  public error = '';
  public form = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: this.passwordMatchValidator },
  );
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  private passwordMatchValidator(group: any): ValidationErrors | null {
    return group.value.password === group.value.confirmPassword ? null : { mismatch: true };
  }

  public async signup(): Promise<void> {
    if (this.form.valid) {
      this.loading = true;
      this.error = '';

      try {
        await this.auth.signup(
          this.form.value.email!,
          this.form.value.password!,
          this.form.value.firstName!,
          this.form.value.lastName!,
        );

        this.router.navigate(['/verify'], {
          queryParams: { email: this.form.value.email },
        });
      } catch (e: any) {
        this.error = e.message || 'Signup failed';
      } finally {
        this.loading = false;
      }
    }
  }

  public async google(): Promise<void> {
    return this.auth.googleLogin();
  }
}
