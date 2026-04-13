import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  EmbeddedViewRef,
  ContentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'expandable-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expandable-card.html',
  styleUrl: './expandable-card.scss',
})
export class ExpandableCardComponent implements OnDestroy {
  @Input() title = '';
  @Input() src = '';
  @Input() description = '';
  @ContentChild('expandedContent') expandedTpl!: TemplateRef<any>;
  @ContentChild('expandedHeader') headerTpl!: TemplateRef<any>;
  @Output() opened = new EventEmitter<HTMLElement>();
  @Output() closed = new EventEmitter<void>();

  active = false;
  private overlayEl: HTMLElement | null = null;
  private headerViewRef: EmbeddedViewRef<any> | null = null;
  private contentViewRef: EmbeddedViewRef<any> | null = null;

  constructor(private vcr: ViewContainerRef) {}

  open() {
    if (this.active) return;
    this.active = true;
    this.createOverlay();
  }

  close() {
    if (!this.active) return;
    this.active = false;
    this.closed.emit();
    if (this.overlayEl) {
      this.overlayEl.classList.remove('ec-visible');
      setTimeout(() => this.destroyOverlay(), 280);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.active) this.close();
  }

  private createOverlay() {
    const host = document.createElement('div');
    host.className = 'ec-portal-host';

    // Build header: use headerTpl if provided, otherwise fall back to image
    const hasHeaderTpl = !!this.headerTpl;
    const imageHtml = hasHeaderTpl
      ? '<div class="ec-header-slot"></div>'
      : `<div class="ec-image-wrap">
           <img src="${this.src}" alt="${this.title}" class="ec-image" />
           <div class="ec-image-fade"></div>
         </div>`;

    host.innerHTML = `
      <div class="ec-overlay">
        <div class="ec-expanded">
          <div class="ec-top-header">
            <div>
              <p class="ec-description">${this.description}</p>
              <h3 class="ec-title">${this.title}</h3>
            </div>
            <button class="ec-close-btn" aria-label="Close card">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6L6 18" /><path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
          ${imageHtml}
          <div class="ec-body">
            <div class="ec-content"></div>
          </div>
        </div>
      </div>
    `;

    // Render header template if provided
    if (hasHeaderTpl) {
      this.headerViewRef = this.vcr.createEmbeddedView(this.headerTpl);
      this.headerViewRef.detectChanges();
      const headerSlot = host.querySelector('.ec-header-slot')!;
      for (const node of this.headerViewRef.rootNodes) {
        headerSlot.appendChild(node);
      }
    }

    // Render expanded content
    if (this.expandedTpl) {
      this.contentViewRef = this.vcr.createEmbeddedView(this.expandedTpl);
      this.contentViewRef.detectChanges();
      const contentSlot = host.querySelector('.ec-content')!;
      for (const node of this.contentViewRef.rootNodes) {
        contentSlot.appendChild(node);
      }
    }

    // Close on overlay click (outside panel)
    const overlay = host.querySelector('.ec-overlay')!;
    overlay.addEventListener('click', (e: Event) => {
      const panel = host.querySelector('.ec-expanded');
      if (panel && !panel.contains(e.target as Node)) {
        this.close();
      }
    });

    // Close button
    const closeBtn = host.querySelector('.ec-close-btn')!;
    closeBtn.addEventListener('click', (e: Event) => {
      e.stopPropagation();
      this.close();
    });

    document.body.appendChild(host);
    this.overlayEl = host;

    requestAnimationFrame(() => {
      host.classList.add('ec-visible');
      this.opened.emit(host);
    });
  }

  private destroyOverlay() {
    if (this.headerViewRef) {
      const idx = this.vcr.indexOf(this.headerViewRef);
      if (idx >= 0) this.vcr.remove(idx);
      this.headerViewRef = null;
    }
    if (this.contentViewRef) {
      const idx = this.vcr.indexOf(this.contentViewRef);
      if (idx >= 0) this.vcr.remove(idx);
      this.contentViewRef = null;
    }
    if (this.overlayEl?.parentNode) {
      this.overlayEl.parentNode.removeChild(this.overlayEl);
    }
    this.overlayEl = null;
  }

  ngOnDestroy() {
    this.destroyOverlay();
  }
}
