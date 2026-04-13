import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
})
export class PortalComponent {
  navOpen = false;

  toggleNav() {
    this.navOpen = !this.navOpen;
  }
}
