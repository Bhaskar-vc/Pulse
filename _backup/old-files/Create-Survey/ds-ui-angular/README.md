# ds-ui-angular

Angular component library generated from the **Design System Dashboard** Figma file.

## Components

| Component | Selector | Description |
|---|---|---|
| Button | `<ds-button>` | 5 variants × 3 sizes, loading & disabled states |
| Checkbox | `<ds-checkbox>` | Checked / unchecked / indeterminate, CVA-compatible |
| Tag | `<ds-tag>` | 6 colour variants, dot/icon/avatar/country/x-close icons |
| Progress | `<ds-progress>` | Linear (bar + tooltip) and Circular (donut) modes |
| Toast | `<ds-toast>` | 4 types (info/success/warning/error), auto-dismiss |
| Alert | `<ds-alert>` | 4 variants, optional icon, title, message, action buttons |
| Pagination | `<ds-pagination>` | Rows-per-page select, Go-to input, prev/next arrows |
| Card | `<ds-card>` | Media, header, body, footer slots; accent color bar |

## Design Tokens

All tokens live in `src/lib/tokens/_tokens.scss` as CSS custom properties and
are automatically available in every component's stylesheet.

Key tokens:
```
--color-primary-700: #6941c6   (deep brand purple)
--color-primary-600: #7f56d9   (brand purple)
--color-primary-500: #29294c   (primary text)
--color-primary-300: #707087   (secondary text)
--shadow-md: 0px 4px 8px -2px rgba(16,24,40,.10), ...
--radius-lg: 12px
--font-family: 'Inter', system-ui, sans-serif
```

## Usage

### 1. Import tokens globally (`styles.scss`)
```scss
@use 'src/lib/tokens/tokens';
```

### 2. Import individual components (standalone)
```typescript
import { ButtonComponent, TagComponent } from './lib';

@Component({
  standalone: true,
  imports: [ButtonComponent, TagComponent],
  template: `
    <ds-button variant="primary" (clicked)="save()">Save</ds-button>
    <ds-tag label="Active" color="success" icon="dot"></ds-tag>
  `
})
export class MyComponent {}
```

### 3. Button
```html
<ds-button variant="primary" size="md">Label</ds-button>
<ds-button variant="secondary" [loading]="isSaving">Saving…</ds-button>
<ds-button variant="danger"   [disabled]="true">Delete</ds-button>
```
`variant`: `primary | secondary | ghost | danger | link`
`size`: `sm | md | lg`

### 4. Checkbox (reactive forms)
```html
<ds-checkbox formControlName="agree"
             label="I accept the terms"
             description="Read our privacy policy">
</ds-checkbox>
```

### 5. Tag
```html
<ds-tag label="New"     color="success" icon="dot"></ds-tag>
<ds-tag label="Overdue" color="error"   icon="x" [dismissible]="true"
        (dismiss)="onRemove()"></ds-tag>
```
`color`: `primary | error | success | purple | blue-gray | warning`
`icon`:  `dot | x | avatar | icon-left | country | none`

### 6. Progress
```html
<!-- Linear bar -->
<ds-progress type="linear" [value]="75" label="Upload"></ds-progress>

<!-- Circular donut -->
<ds-progress type="circular" [value]="40" label="Users"></ds-progress>
```

### 7. Toast
```html
<ds-toast type="success"
          title="Saved!"
          message="Your changes were saved."
          [duration]="4000"
          (dismissed)="onDismiss()">
</ds-toast>
```

### 8. Alert
```html
<ds-alert variant="warning"
          title="Session expiring"
          message="You will be logged out in 5 minutes."
          primaryAction="Stay logged in"
          (primaryClick)="extendSession()">
</ds-alert>
```

### 9. Pagination
```html
<ds-pagination
  [totalItems]="totalRows"
  [currentPage]="page"
  [pageSize]="size"
  (pageChange)="onPage($event)">
</ds-pagination>
```
`pageChange` emits `{ page: number, pageSize: number }`.

### 10. Card
```html
<ds-card title="Analytics" subtitle="Last 30 days"
         accentColor="#6941c6" [hasFooter]="true">
  <p>Content goes here</p>
  <ng-container slot="footer">
    <ds-button variant="primary" [block]="true">View Report</ds-button>
  </ng-container>
</ds-card>
```

## Preview

Run the showcase in any Angular project:
```typescript
import { ShowcaseComponent } from './showcase/showcase.component';
// Add to AppComponent imports, then use <ds-showcase />
```
