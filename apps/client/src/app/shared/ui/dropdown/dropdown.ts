import { Component, signal, effect, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  Briefcase,
  Calendar,
  ChevronDown,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Image,
  LucideIconData
} from 'lucide-angular';

export interface DropdownItem {
  label?: string;
  icon?: LucideIconData;
  translationKey?: string;
  routerLink?: string;
  action?: () => void;
  divider?: boolean;
  exactUrl?: boolean;
}

@Component({
  selector: 'ui-dropdown',
  imports: [CommonModule, RouterModule],
  templateUrl: './dropdown.html',
  host: {
    class: 'relative inline-block',
    '(click)': 'onClickOutside($event)'
  }
})
export class Dropdown {
  isOpen = signal(false);
  itemSelected = output<DropdownItem>();

  private items: DropdownItem[] = [
    { label: 'Opportunities', icon: Briefcase, routerLink: '/opportunities' },
    { label: 'Nos entrepreneurs', translationKey: 'nav.entrepreneurs', routerLink: '/entrepreneurs', exactUrl: true },
    { label: 'Blog', translationKey: 'nav.blogResources', routerLink: '/blog-ressources', icon: FileText },
    { label: 'Galerie', translationKey: 'nav.gallery', routerLink: '/gallery', icon: Image },
    { label: 'À propos', translationKey: 'nav.about', routerLink: '/about-us' },
    { label: 'Contacts', translationKey: 'nav.contact', routerLink: '/contact-us', icon: Image }
  ];

  items$ = signal(this.items);

  icons = {
    chevronDown: ChevronDown,
    layoutDashboard: LayoutDashboard,
    fileText: FileText,
    calendar: Calendar,
    helpCircle: HelpCircle,
    logOut: LogOut,
    briefcase: Briefcase
  };

  constructor() {
    effect(() => {
      if (!this.isOpen()) {
        this.closeDropdown();
      }
    });
  }

  toggleDropdown(): void {
    this.isOpen.update((v) => !v);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  selectItem(item: DropdownItem): void {
    this.itemSelected.emit(item);
    if (item.action) {
      item.action();
    }
    this.closeDropdown();
  }

  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('[data-dropdown-trigger]')) {
      this.toggleDropdown();
    } else if (!target.closest('[data-dropdown-menu]')) {
      this.closeDropdown();
    }
  }
}
