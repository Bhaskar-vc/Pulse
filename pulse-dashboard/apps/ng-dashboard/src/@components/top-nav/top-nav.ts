import { Component, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
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
  productPanelOpen = false;

  constructor(private el: ElementRef) {}

  toggle() {
    this.navOpen = !this.navOpen;
    this.sidebarToggle.emit();
  }

  toggleProductSwitch() {
    this.productPanelOpen = !this.productPanelOpen;
  }

  @HostListener('document:mousedown', ['$event'])
  onDocClick(e: MouseEvent) {
    const wrap = this.el.nativeElement.querySelector('.tn-product-wrap');
    if (wrap && !wrap.contains(e.target as Node) && this.productPanelOpen) {
      this.productPanelOpen = false;
    }
  }
}
