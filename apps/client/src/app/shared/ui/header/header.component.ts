import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthModalService, AuthModalTab } from '../auth-modal/auth-modal.service';
import { Dropdown } from '../dropdown/dropdown';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [CommonModule, RouterModule, Dropdown],
  templateUrl: './header.html',
  host: {
    class: 'block',
    '[attr.role]': '"banner"'
  }
})
export class Header {
  private authModalService = inject(AuthModalService);

  isLoggedIn = signal(false);
  currentLanguage = signal<'fr' | 'en'>('fr');
  isMobileMenuOpen = signal(false);

  navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    { label: 'Programs', path: '/programs' }
  ];

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  changeLanguage(lang: 'fr' | 'en'): void {
    this.currentLanguage.set(lang);
  }

  async openAuthModal(tab: AuthModalTab): Promise<void> {
    const result = await this.authModalService.open(tab);
    if (result.success) {
      this.isLoggedIn.set(true);
    }
  }

  handleLogout(): void {
    this.isLoggedIn.set(false);
  }
}
