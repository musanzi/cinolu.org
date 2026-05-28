import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { LucideAngularModule, Eye, EyeOff, X, Mail, Lock, Github, Linkedin, ArrowRight } from 'lucide-angular';
import { AuthModalData, AuthModalTab, AuthModalResult, AuthProvider } from './auth-modal.service';

@Component({
  selector: 'ui-auth-modal',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.css',
  host: {
    class: 'block',
    '[attr.role]': '"dialog"',
    '[attr.aria-modal]': 'true'
  }
})
export class AuthModal {
  private dialogRef = inject(DialogRef<AuthModalResult>);
  private data = inject<AuthModalData | null>(DIALOG_DATA, { optional: true });
  private formBuilder = inject(NonNullableFormBuilder);

  activeTab = signal<AuthModalTab>(this.data?.tab ?? 'login');
  isLoading = signal(false);
  showPassword = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [true]
  });

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    acceptTerms: [false, [Validators.requiredTrue]]
  });

  icons = {
    eye: Eye,
    eyeOff: EyeOff,
    x: X,
    mail: Mail,
    lock: Lock,
    github: Github,
    linkedin: Linkedin,
    arrowRight: ArrowRight
  };

  switchTab(tab: AuthModalTab): void {
    this.errorMessage.set(null);
    this.activeTab.set(tab);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  async handleLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage.set('Enter a valid email and a password with at least 6 characters.');
      return;
    }

    const { email } = this.loginForm.getRawValue();
    await this.completeAuth({ email, mode: 'login' });
  }

  async handleRegister(): Promise<void> {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.errorMessage.set('Complete the form and accept the terms to create your account.');
      return;
    }

    const { email } = this.registerForm.getRawValue();
    await this.completeAuth({ email, mode: 'register' });
  }

  async handleSocialLogin(provider: AuthProvider): Promise<void> {
    await this.completeAuth({
      email: '',
      mode: this.activeTab(),
      provider
    });
  }

  close(): void {
    this.dialogRef.close({ success: false, mode: this.activeTab() });
  }

  private async completeAuth(data: NonNullable<AuthModalResult['data']>): Promise<void> {
    this.errorMessage.set(null);
    this.isLoading.set(true);
    await new Promise<void>((resolve) => {
      globalThis.setTimeout(resolve, 250);
    });
    this.dialogRef.close({
      success: true,
      mode: data.mode,
      data
    });
    this.isLoading.set(false);
  }
}
