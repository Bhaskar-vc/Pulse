import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import './app/shared/pixel-canvas/pixel-canvas.element';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
