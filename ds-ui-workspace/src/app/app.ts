import { Component } from '@angular/core';
import { ShowcaseComponent } from '../showcase/showcase.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShowcaseComponent],
  template: `<ds-showcase />`
})
export class App {}
