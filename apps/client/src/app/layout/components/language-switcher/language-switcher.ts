import { Component, inject, HostListener, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { LanguageService } from '@core/services/language';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, ChevronDown, Check } from 'lucide-angular';

@Component({
  selector: 'app-language-switcher',
  imports: [TranslateModule, LucideAngularModule, NgClass],
  templateUrl: './language-switcher.html'
})
export class LanguageSwitcherComponent {
  readonly languageService = inject(LanguageService);
  /** Sur topbar transparente (fond sombre) : hover clair, texte blanc */
  readonly inverted = input(false);
  isOpen = false;

  icons = {
    chevronDown: ChevronDown,
    check: Check
  };

  currentLangInfo() {
    return this.languageService.getCurrentLanguageInfo();
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  selectLanguage(lang: 'fr' | 'en') {
    this.languageService.switchLanguage(lang);
    this.closeDropdown();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const switcherButton = target.closest('.lang-switcher-button');
    const switcherDropdown = target.closest('.lang-switcher-dropdown');

    if (!switcherButton && !switcherDropdown && this.isOpen) {
      this.closeDropdown();
    }
  }
}
