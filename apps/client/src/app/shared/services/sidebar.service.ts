import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isExpandedSubject = new BehaviorSubject<boolean>(true);
  private readonly isMobileOpenSubject = new BehaviorSubject<boolean>(false);
  private readonly isHoveredSubject = new BehaviorSubject<boolean>(false);

  readonly isExpanded$ = this.isExpandedSubject.asObservable();
  readonly isMobileOpen$ = this.isMobileOpenSubject.asObservable();
  readonly isHovered$ = this.isHoveredSubject.asObservable();

  setExpanded(val: boolean): void {
    this.isExpandedSubject.next(val);
  }

  toggleExpanded(): void {
    this.isExpandedSubject.next(!this.isExpandedSubject.value);
  }

  setMobileOpen(val: boolean): void {
    this.isMobileOpenSubject.next(val);
  }

  toggleMobileOpen(): void {
    this.isMobileOpenSubject.next(!this.isMobileOpenSubject.value);
  }

  setHovered(val: boolean): void {
    this.isHoveredSubject.next(val);
  }

  /** TailAdmin xl breakpoint — desktop sidebar toggle vs mobile drawer */
  isDesktopViewport(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }
    return window.innerWidth >= 1280;
  }

  handleToggle(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (this.isDesktopViewport()) {
      this.toggleExpanded();
    } else {
      this.toggleMobileOpen();
    }
  }

  closeMobile(): void {
    this.setMobileOpen(false);
  }
}
