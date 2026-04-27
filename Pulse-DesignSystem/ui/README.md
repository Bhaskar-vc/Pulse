# @pulse-ds/ui

Pulse Design System — Angular 17+ component library by Vantage Circle.

## Installation

```bash
npm install @pulse-ds/ui
```

**For GitHub Packages**, add to your `.npmrc`:
```
@pulse-ds:registry=https://npm.pkg.github.com
```

## Quick Start

Import individual components from secondary entry points (tree-shakable):

```typescript
import { VButton } from '@pulse-ds/ui/button';
import { VAlert } from '@pulse-ds/ui/alert';
import { VModal } from '@pulse-ds/ui/modal';

@Component({
  standalone: true,
  imports: [VButton, VAlert, VModal],
  template: `
    <v-alert type="success" title="Saved!" message="Your changes were saved." [dismissible]="true"></v-alert>
    <v-button variant="solid" color="primary" (clicked)="onClick()">Submit</v-button>
  `
})
export class MyComponent {}
```

Or import NgModules for non-standalone apps:

```typescript
import { AlertModule } from '@pulse-ds/ui/alert';
import { TagModule } from '@pulse-ds/ui/tag';

@NgModule({
  imports: [AlertModule, TagModule],
})
export class FeatureModule {}
```

## Components (42)

### Layout
`button` · `button-group` · `card` · `divider` · `carousel` · `dropdown-menu`

### Form Controls
`checkbox` · `toggle` · `input` · `input-field` · `textarea` · `radio` · `slider` · `dropdown` · `select` · `autocomplete` · `listbox` · `rating` · `calendar` · `segment` · `file-upload` · `upload`

### Data Display
`tag` · `avatar` · `progress` · `table` · `table-legacy` · `steps` · `stepper`

### Feedback
`alert` · `toast` · `modal` · `tooltip` · `tooltip-v2` · `spinner` · `empty-state`

### Navigation
`tabs` · `tab-navigation` · `pagination` · `accordion`

### Utilities
`label` · `core`

## Documentation

Interactive Storybook: [https://bhaskar-vc.github.io/Pulse-designsystem/](https://bhaskar-vc.github.io/Pulse-designsystem/)

## Peer Dependencies

```json
{
  "@angular/core": "^17.0.0",
  "@angular/common": "^17.0.0",
  "@angular/forms": "^17.0.0",
  "@angular/animations": "^17.0.0"
}
```

## Development

```bash
cd pulse-ds

# Install dependencies
npm install

# Run Storybook
npm run storybook

# Build library
npm run build:lib

# Build Storybook static site
npm run build-storybook
```

## Release

Tag a version to trigger CI/CD:

```bash
git tag v0.1.0
git push origin v0.1.0
```

This will:
1. Build and publish `@pulse-ds/ui` to GitHub Packages
2. Build and deploy Storybook to GitHub Pages

## License

Proprietary — Vantage Circle
