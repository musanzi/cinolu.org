import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { firstValueFrom } from 'rxjs';
import { AuthModal } from './auth-modal.component';

export type AuthModalTab = 'login' | 'register';
export type AuthProvider = 'google' | 'github' | 'linkedin';

export interface AuthModalData {
  tab: AuthModalTab;
}

export interface AuthModalPayload {
  email: string;
  mode: AuthModalTab;
  provider?: AuthProvider;
}

export interface AuthModalResult {
  success: boolean;
  mode: AuthModalTab;
  data?: AuthModalPayload;
}

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {
  private dialog = inject(Dialog);

  async open(tab: AuthModalTab = 'login'): Promise<AuthModalResult> {
    const dialogRef = this.dialog.open<AuthModalResult, AuthModalData, AuthModal>(AuthModal, {
      width: 'min(100vw - 2rem, 460px)',
      maxWidth: '460px',
      panelClass: 'auth-modal-panel',
      backdropClass: 'auth-modal-backdrop',
      data: { tab },
      disableClose: false,
      closeOnNavigation: true,
      autoFocus: 'first-tabbable'
    });

    const result = await firstValueFrom(dialogRef.closed);
    return result ?? { success: false, mode: tab };
  }

  close(): void {
    this.dialog.closeAll();
  }
}
