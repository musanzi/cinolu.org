# Header, Dropdown & Auth Modal Components

Modern, accessible navigation system for Angular applications with integrated authentication modal.

## Components Overview

### 1. **Header Component** (`header/`)

Main navigation bar with responsive design, language selector, and account management.

**Features:**

- Responsive navigation (mobile hamburger menu)
- Language selector (FR/EN)
- Account button with login/logout
- Active link highlighting
- Mobile-friendly dropdown toggle

**Usage:**

```typescript
import { Header } from '@shared/ui';

@Component({
  imports: [Header],
  template: `<ui-header />`
})
export class Layout {}
```

**Customization:**

- Modify `navItems` array for navigation links
- Update icon references to match your icon library
- Change color classes (primary-600 → your brand color)

---

### 2. **Dropdown Component** (`dropdown/`)

Accessible dropdown menu for secondary navigation (My Cinolu).

**Features:**

- Keyboard navigation (Arrow keys, Enter, Escape)
- ARIA attributes for screen readers
- Click-outside to close
- Mobile backdrop
- Smooth animations

**Usage:**

```typescript
import { Dropdown } from '@shared/ui';

@Component({
  imports: [Dropdown],
  template: `<ui-dropdown />`
})
export class Nav {}
```

**Props:**

- `itemSelected`: Output event when menu item is selected
- `isOpen`: Signal tracking menu state
- `items$`: Signal array of menu items

---

### 3. **Auth Modal Component** (`auth-modal/`)

Accessible authentication modal with login/register tabs.

**Features:**

- Tabbed interface (Login/Register)
- Form validation
- Password visibility toggle
- Social login UI (placeholder)
- Email & password inputs
- Focus trap (ESC to close)
- Smooth animations

**Usage via Service:**

```typescript
import { AuthModalService } from '@shared/ui';

@Component({})
export class MyComponent {
  private authModal = inject(AuthModalService);

  async openLogin() {
    const result = await this.authModal.open('login');
    if (result.success) {
      console.log('Logged in:', result.data);
    }
  }

  async openRegister() {
    const result = await this.authModal.open('register');
    if (result.success) {
      console.log('Registered:', result.data);
    }
  }
}
```

---

### 4. **Auth Modal Service** (`auth-modal/auth-modal.service.ts`)

Handles modal lifecycle and state management using Angular CDK Dialog.

**Methods:**

```typescript
// Open modal with specific tab
open(tab: 'login' | 'register'): Promise<AuthModalResult>

// Close all open dialogs
close(result?: AuthModalResult): void
```

**Result Interface:**

```typescript
interface AuthModalResult {
  success: boolean;
  data?: {
    email: string;
    mode: 'login' | 'register';
  };
}
```

---

## Setup Instructions

### Step 1: Add CDK Dialog Provider

In your `main.ts`:

```typescript
import { provideDialog } from '@angular/cdk/dialog';

bootstrapApplication(App, {
  providers: [
    provideDialog()
    // ... other providers
  ]
});
```

### Step 2: Import Header Component

In your layout component:

```typescript
import { Header } from '@shared/ui';

@Component({
  selector: 'app-layout',
  imports: [Header, RouterOutlet],
  template: `
    <header-nav />
    <main>
      <router-outlet />
    </main>
  `
})
export class Layout {}
```

### Step 3: Update Your App Routes

Ensure routes reference `/dashboard` for "My Cinolu" dropdown:

```typescript
const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'dashboard/applications', component: Applications }
  // ...
];
```

---

## Styling & Customization

### Color Theme

All components use `primary-*` Tailwind colors. Update your `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',   // light background
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',  // main color
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',  // dark color
      }
    }
  }
}
```

### Icons

Components use inline SVG icons. To use an icon library like `lucide-ng`:

1. **Install:**

   ```bash
   npm install lucide-angular
   ```

2. **Update components:**

   ```typescript
   import { LucideAngularModule } from 'lucide-angular';

   // In dropdown.html:
   // Replace: <svg ...>...</svg>
   // With: <i-lucide [name]="'menu'" />
   ```

### Animations

Modify animation speeds in `auth-modal.css`:

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
}
/* Adjust duration: duration-300 → duration-500 */
```

---

## Accessibility Features

✅ **ARIA Attributes:**

- Proper `role` attributes
- `aria-label` for buttons
- `aria-hidden` for decorative elements
- `aria-pressed` for toggle states
- `aria-modal` for dialog

✅ **Keyboard Navigation:**

- ESC to close modal
- Tab through form inputs
- Enter to submit forms
- Space to toggle dropdowns

✅ **Focus Management:**

- Focus trap in modal
- Focus restoration on close
- Visible focus indicators

✅ **Semantic HTML:**

- Proper heading hierarchy
- Form elements with labels
- Button vs link semantics

---

## Responsive Behavior

| Device                  | Layout                                           |
| ----------------------- | ------------------------------------------------ |
| **Mobile** (<640px)     | Hamburger menu, stacked language selector        |
| **Tablet** (640-1024px) | Hamburger menu, language selector visible        |
| **Desktop** (>1024px)   | Full horizontal navigation, all elements visible |

---

## API Integration

### Login Handler

Update `auth-modal.component.ts`:

```typescript
async handleLogin(): Promise<void> {
  const form = this.loginForm();
  this.isLoading.set(true);

  try {
    // Replace with your API call
    const response = await this.authService.login(
      form.email,
      form.password
    ).toPromise();

    this.dialogRef.close({
      success: true,
      data: response
    });
  } catch (error) {
    // Handle error
  } finally {
    this.isLoading.set(false);
  }
}
```

### Social Login

Update `handleSocialLogin`:

```typescript
handleSocialLogin(provider: string): void {
  // Implement OAuth flow (Google, GitHub, LinkedIn)
  // Redirect to auth service or open auth provider window
}
```

---

## Form Validation

Current validation rules:

- **Email:** Valid email format required
- **Password:** Minimum 6 characters

Customize in `auth-modal.component.ts`:

```typescript
private validateForm(form: AuthFormData): boolean {
  // Add your validation logic
  return true;
}
```

---

## Common Tasks

### Hide Header for Specific Routes

```typescript
@Component({
  template: `
    @if (!isAuthRoute()) {
      <header-nav />
    }
    <router-outlet />
  `
})
export class Layout {
  isAuthRoute = computed(() => this.route.snapshot.url[0]?.path === 'auth');
}
```

### Custom Language Handling

```typescript
changeLanguage(lang: 'fr' | 'en'): void {
  this.currentLanguage.set(lang);
  this.translateService.use(lang);
  localStorage.setItem('language', lang);
}
```

### Programmatic Modal Opening

```typescript
// From any component
async openAuthModal(tab: 'login' | 'register') {
  const authService = inject(AuthModalService);
  const result = await authService.open(tab);
  // Handle result
}
```

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance Tips

1. **Lazy Load Modal:** Modal only loads when needed
2. **OnPush Strategy:** Components use ChangeDetectionStrategy.OnPush
3. **Signal-Based:** Reactive updates without zone pollution
4. **CSS Animations:** Hardware-accelerated with transform/opacity

---

## Troubleshooting

| Issue                   | Solution                                    |
| ----------------------- | ------------------------------------------- |
| CDK Dialog not working  | Add `provideDialog()` to providers          |
| Styles not applied      | Ensure Tailwind CSS is configured           |
| Icons not showing       | Replace inline SVGs with icon library       |
| Mobile menu not closing | Check `closeDropdown()` is called           |
| Focus not visible       | Ensure browser focus-visible styles enabled |

---

## License

Part of Cinolu Platform. All rights reserved.
