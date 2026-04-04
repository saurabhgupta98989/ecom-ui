import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent {
  public loading = false;
  public error = '';
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public async login(): Promise<void> {
    if (this.form.valid) {
      this.loading = true;
      this.error = '';
      try {
        await this.authService.login(this.form.value.email!, this.form.value.password!);
        this.router.navigate(['/']);
      } catch (e: any) {
        this.error = e.message || 'Login failed';
      } finally {
        this.loading = false;
      }
    }
  }

  public async google(): Promise<void> {
    this.authService.googleLogin();
  }
}
