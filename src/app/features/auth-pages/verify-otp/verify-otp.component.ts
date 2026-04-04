import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

@Component({
  selector: 'app-verify-otp',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.scss',
})
export class VerifyOtpComponent {
  public loading = signal(false);
  public error = signal('');
  public countdown = signal(30);
  public form = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });
  public get email(): string {
    return this.route.snapshot.queryParams['email'];
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.startTimer();
  }

  public async verify(): Promise<void> {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set('');
    try {
      await confirmSignUp({
        username: this.email,
        confirmationCode: this.form.value.code!,
      });
      this.router.navigate(['/login']);
    } catch (e: any) {
      this.error.set(e.message || 'Invalid code');
    } finally {
      this.loading.set(false);
    }
  }

  public async resend(): Promise<void> {
    if (this.countdown() > 0) return;
    await resendSignUpCode({ username: this.email });
    this.countdown.set(30);
    this.startTimer();
  }

  private startTimer(): void {
    const interval = setInterval(() => {
      if (this.countdown() === 0) {
        clearInterval(interval);
        return;
      }
      this.countdown.update((v) => v - 1);
    }, 1000);
  }
}
