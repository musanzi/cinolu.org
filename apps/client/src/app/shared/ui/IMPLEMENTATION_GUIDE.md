# Implementation Example: Integrating Header into Cinolu Layout

This guide shows exactly how to integrate the new Header, Dropdown, and Auth Modal components into the existing Cinolu layout structure.

## Current Structure

Your current layout has:

- `FullLayout` - Main layout with AppTopbar, Footer, and RouterOutlet
- `FixedLayout` - For specific page layouts
- `EmptyLayout` - For pages without header/footer

The new `Header` component will replace or complement the existing `AppTopbar`.

---

## Option 1: Replace AppTopbar (Recommended)

### Step 1: Update `main.ts`

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideDialog } from '@angular/cdk/dialog'; // ← ADD THIS
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideApp } from './app/core/providers/app.provider';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideDialog(), // ← ADD THIS
    ...provideApp()
  ]
});
```

### Step 2: Update `full-layout.ts`

```typescript
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { Header } from '@shared/ui'; // ← ADD THIS
import { Footer } from '../../components/footer/footer';
import { BackButton } from '../../../shared/components/back-button/back-button';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.html',
  imports: [
    RouterOutlet,
    Header, // ← REPLACE AppTopbar with Header
    Footer,
    BackButton
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullLayout implements OnInit, OnDestroy {
  readonly topbarFixed = signal(false);

  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.#router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.#destroy$)
      )
      .subscribe(() => {
        // Your existing logic
      });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
```

### Step 3: Update `full-layout.html`

```html
<!-- Before -->
<app-topbar [fixed]="topbarFixed()"></app-topbar>

<!-- After -->
<header-nav />

<main class="min-h-screen">
  <back-button />
  <router-outlet />
</main>

<app-footer />
```

---

## Option 2: Keep AppTopbar + Add Header

If you want to keep your existing AppTopbar and add the new Header below it:

### Step 1: Update `full-layout.ts`

```typescript
import { Header } from '@shared/ui'; // ← ADD THIS

@Component({
  selector: 'app-full-layout',
  imports: [
    RouterOutlet,
    AppTopbar,
    Header, // ← ADD THIS
    Footer,
    BackButton
  ]
})
export class FullLayout {
  // ...
}
```

### Step 2: Update `full-layout.html`

```html
<app-topbar [fixed]="topbarFixed()"></app-topbar> <header-nav />
<!-- ← ADD THIS -->

<main class="min-h-screen">
  <back-button />
  <router-outlet />
</main>

<app-footer />
```

---

## Option 3: Header for Specific Routes Only

If you want the Header only on certain pages:

### Step 1: Update `full-layout.ts`

```typescript
import { computed } from '@angular/core';
import { Header } from '@shared/ui';

@Component({
  selector: 'app-full-layout',
  imports: [RouterOutlet, AppTopbar, Header, Footer, BackButton]
})
export class FullLayout implements OnInit {
  readonly currentRoute = signal<string>('');

  // Show header on public pages, not on dashboard
  readonly showHeader = computed(() => {
    const route = this.currentRoute();
    return !route.startsWith('/dashboard');
  });

  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.#router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.#destroy$)
      )
      .subscribe((event: any) => {
        this.currentRoute.set(event.urlAfterRedirects);
      });
  }
}
```

### Step 2: Update `full-layout.html`

```html
<app-topbar [fixed]="topbarFixed()"></app-topbar>

@if (showHeader()) {
<ui-header />
}

<main class="min-h-screen">
  <back-button />
  <router-outlet />
</main>

<app-footer />
```

---

## Handling Authentication State

### Step 1: Update Header to Use Auth Store

```typescript
// In your header.component.ts
import { AuthStore } from '@core/auth/auth.store';
import { computed } from '@angular/core';

export class Header {
  private authStore = inject(AuthStore);

  // Derive logged-in state from auth store
  isLoggedIn = computed(() => this.authStore.user() !== null);

  async handleAccountClick(): Promise<void> {
    if (this.isLoggedIn()) {
      // Open user profile menu
      console.log('User menu');
    } else {
      const result = await this.authModalService.open('login');
      if (result.success) {
        // Auth store will update automatically via interceptor
        this.isLoggedIn.set(true);
      }
    }
  }
}
```

### Step 2: Update Auth Modal to Trigger Store

After successful login/register, the interceptor should handle setting the user. Your modal just needs to close successfully.

---

## Styling Integration

### Step 1: Ensure Tailwind CSS is Configured

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7', // Update to match Cinolu brand
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e'
        }
      }
    }
  }
};
```

### Step 2: (Optional) Override Component Styles

Add to your global `styles.css`:

```css
/* Custom header styling */
ui-header {
  --primary-color: #0284c7;
  --hover-color: rgba(2, 132, 199, 0.1);
}

/* Custom animations */
@keyframes slideDownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Language Integration

### Step 1: Update Header for Your Language Service

```typescript
import { LanguageService } from '@core/services/language';

export class Header {
  private languageService = inject(LanguageService);

  currentLanguage = toSignal(this.languageService.language$);

  changeLanguage(lang: 'fr' | 'en'): void {
    this.languageService.setLanguage(lang);
  }
}
```

### Step 2: Update HTML to Use Translations

```html
<!-- In header.html -->
<a [routerLink]="item.path" routerLinkActive="text-primary-600"> {{ 'header.' + item.label | translate }} </a>
```

Add to your translation files:

```json
// assets/i18n/en.json
{
  "header": {
    "home": "Home",
    "events": "Events",
    "programs": "Programs",
    "my_cinolu": "My Cinolu",
    "sign_in": "Sign in"
  }
}

// assets/i18n/fr.json
{
  "header": {
    "home": "Accueil",
    "events": "Événements",
    "programs": "Programmes",
    "my_cinolu": "Mon Cinolu",
    "sign_in": "Se connecter"
  }
}
```

---

## Mobile Responsiveness Testing

Test on different screen sizes:

```bash
# Desktop (>1024px)
- Full navigation visible
- Language selector visible
- Dropdown for "My Cinolu"
- User account icon

# Tablet (640-1024px)
- Hamburger menu appears
- Language selector visible
- Compact layout

# Mobile (<640px)
- Full hamburger menu
- Stacked language selector
- Full-screen mobile navigation
```

---

## Dialog Styling (Optional)

To match your existing design system, add custom CDK dialog styling:

```css
/* styles/cdk-dialog.css */

:host ::ng-deep {
  .cdk-overlay-pane {
    /* Your custom styles */
  }

  .cdk-overlay-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .auth-modal-panel {
    /* Auth modal specific styles */
  }
}
```

---

## Complete Integration Checklist

- [ ] Add `provideDialog()` to main.ts providers
- [ ] Import `Header` in your layout component
- [ ] Update layout template to include `<ui-header />`
- [ ] Configure Tailwind colors to match brand
- [ ] Test on mobile devices
- [ ] Integrate with AuthStore/AuthService
- [ ] Add translations if needed
- [ ] Test login/register modal
- [ ] Test navigation links
- [ ] Test language switcher
- [ ] Verify accessibility (keyboard nav, screen reader)
- [ ] Performance check (Lighthouse)

---

## Troubleshooting

### Dialog not opening

```
Error: Dialog not provided
Solution: Add provideDialog() to your providers in main.ts
```

### Styles not applied

```
Error: Tailwind classes not showing
Solution: Ensure tailwind.config.js includes "./src/**/*.{html,ts}"
```

### Header not showing

```
Error: Header component not rendering
Solution: Check that Header is imported in your layout component
```

### Language switching not working

```
Error: Language doesn't change
Solution: Integrate with your LanguageService instead of local signal
```

---

## Next Steps

1. **Update app routes** to include dashboard pages for "My Cinolu"
2. **Implement login API** in `auth-modal.component.ts`
3. **Configure social login** if needed
4. **Add analytics** to track modal opens and conversions
5. **Style refinement** based on Cinolu brand guidelines
6. **User testing** for UX feedback

---

## Questions?

Refer to `COMPONENTS_README.md` for detailed component documentation.
