import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './top-nav.html',
  styleUrl: './top-nav.scss',
})
export class TopNavComponent {
  @Output() sidebarToggle = new EventEmitter<void>();
  navOpen = false;

  toggle() {
    this.navOpen = !this.navOpen;
    this.sidebarToggle.emit();
  }
}
