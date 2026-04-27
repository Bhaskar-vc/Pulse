import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app';
import '@components/pixel-canvas/pixel-canvas.element';

const routes = [
  {
    path: '',
    loadChildren: () =>
      import('./app/portal/portal.module').then((m) => m.PortalModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@auth/routes').then((m) => m.AuthRoutingModule),
  },
  { path: '**', redirectTo: '' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    provideHttpClient(),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25 }),
  ],
}).catch((err) => console.error(err));
