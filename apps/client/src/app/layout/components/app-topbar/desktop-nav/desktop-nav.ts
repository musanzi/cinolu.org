import { Component, input, computed, signal, inject } from '@angular/core';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ILink } from '../../../data/links.data';
import { AuthStore } from '@core/auth/auth.store';
import { ApiImgPipe } from '@shared/pipes';
import { IProgram } from '@shared/models';
import { LanguageSwitcherComponent } from '../../language-switcher/language-switcher';
import { TOPBAR_ICONS } from '../topbar.config';
import { LanguageService } from '@core/services/language/language.service';
import { PublicButton } from '@shared/public';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.html',
  imports: [
    LucideAngularModule,
    ApiImgPipe,
    NgOptimizedImage,
    RouterModule,
    LanguageSwitcherComponent,
    TranslateModule,
    NgClass,
    PublicButton
  ],
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeDropdown()'
  }
})
export class DesktopNav {
  private languageService = inject(LanguageService);

  links = input.required<ILink[]>();
  programs = input.required<IProgram[]>();
  onestopUrl = input.required<string>();
  authStore = input.required<InstanceType<typeof AuthStore>>();
  solid = input(false);

  icons = TOPBAR_ICONS;

  user = computed(() => this.authStore().user());
  openDropdown = signal<string | null>(null);
  navShellClass = computed(() =>
    this.solid()
      ? 'border-transparent bg-transparent text-gray-900 shadow-none ring-0 backdrop-blur-none'
      : 'border-white/15 bg-white/5 text-white backdrop-blur-md'
  );
  navItemClass = computed(() =>
    this.solid() ? 'hover:bg-primary-50 hover:text-primary-700' : 'hover:bg-white/15 hover:text-white'
  );
  navItemActiveClass = computed(() =>
    this.solid() ? 'bg-primary-50 text-primary-700' : 'bg-white text-primary-700 shadow-sm'
  );

  translateField = computed(() => {
    const currentLang = this.languageService.currentLanguage();
    return (value: string | null | undefined, fieldName: string, obj: unknown): string => {
      if (!value) return '';
      if (currentLang === 'fr') return value;
      if (obj && fieldName && typeof obj === 'object' && obj !== null) {
        const translatedField = `${fieldName}_${currentLang}`;
        const translatedValue = (obj as Record<string, unknown>)[translatedField];
        return typeof translatedValue === 'string' ? translatedValue : value;
      }
      return value;
    };
  });

  toggleDropdown(dropdownId: string, event?: Event): void {
    event?.stopPropagation();
    this.openDropdown.update((current) => (current === dropdownId ? null : dropdownId));
  }

  closeDropdown(): void {
    this.openDropdown.set(null);
  }

  isDropdownOpen(dropdownId: string): boolean {
    return this.openDropdown() === dropdownId;
  }

  onDocumentClick(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLElement && !target.closest('.topbar-dropdown-group')) {
      this.closeDropdown();
    }
  }

  onSignOut(): void {
    this.closeDropdown();
    this.authStore().signOut();
  }

  getUserInitials(): string {
    const name = this.user()?.name || 'U';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
