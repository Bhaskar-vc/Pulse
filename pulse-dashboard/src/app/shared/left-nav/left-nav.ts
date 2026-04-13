import { Component, Input, Output, EventEmitter, OnChanges, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-left-nav',
  standalone: true,
  host: { class: 'leftnav' },
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './left-nav.html',
  styleUrl: './left-nav.scss',
})
export class LeftNavComponent implements AfterViewInit, OnChanges {
  @Input() navOpen = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  insightsOpen = false;
  surveysOpen = false;
  settingsOpen = false;

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  onCollapseClick() {
    this.sidebarToggle.emit();
  }

  ngAfterViewInit() {
    this.initTooltip();
  }

  ngOnChanges() {
    if (!this.navOpen) {
      this.insightsOpen = false;
      this.surveysOpen = false;
      this.settingsOpen = false;
    }
  }

  toggleNavItem(item: 'insights' | 'surveys' | 'settings') {
    if (!this.navOpen) return;
    const wasOpen = this[`${item}Open` as keyof this] as boolean;
    this.insightsOpen = false;
    this.surveysOpen = false;
    this.settingsOpen = false;
    if (!wasOpen) (this as any)[`${item}Open`] = true;
  }

  private initTooltip() {
    const tip = document.getElementById('ln-tooltip');
    if (!tip) return;
    let hideTimer: ReturnType<typeof setTimeout>;

    const showTip = (el: HTMLElement) => {
      const pageBody = document.querySelector('.page-body');
      if (pageBody?.classList.contains('nav-open')) return;
      const label = el.getAttribute('title');
      if (!label) return;
      clearTimeout(hideTimer);

      const navItem = el.closest('.ln-nav-item');
      const submenu = navItem ? navItem.querySelector('.ln-submenu') : null;
      const subLinks = submenu ? submenu.querySelectorAll('.ln-sub-item') : [];

      tip.innerHTML = '';

      if (subLinks.length > 0) {
        tip.classList.remove('simple');
        const lbl = document.createElement('span');
        lbl.className = 'tip-label';
        lbl.textContent = label;
        tip.appendChild(lbl);
        subLinks.forEach((a: Element) => {
          const link = document.createElement('a');
          link.className = 'tip-item';
          link.textContent = (a as HTMLElement).textContent;
          const origHref = (a as HTMLAnchorElement).getAttribute('href');
          link.href = origHref || 'javascript:void(0)';
          // Handle Angular routerLink clicks
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const anchor = a as HTMLAnchorElement;
            if (anchor.href && anchor.href !== '#' && !anchor.href.endsWith('void(0)')) {
              anchor.click();
            }
            tip.classList.remove('visible');
          });
          tip.appendChild(link);
        });
      } else {
        tip.classList.add('simple');
        const span = document.createElement('a');
        span.className = 'tip-item';
        span.textContent = label;
        tip.appendChild(span);
      }

      const rect = el.getBoundingClientRect();
      tip.style.left = (rect.right + 10) + 'px';
      tip.style.top = (rect.top + rect.height / 2) + 'px';
      tip.classList.remove('visible');
      requestAnimationFrame(() => tip.classList.add('visible'));
    };

    const hideTip = () => {
      hideTimer = setTimeout(() => tip.classList.remove('visible'), 120);
    };

    tip.addEventListener('mouseenter', () => clearTimeout(hideTimer));
    tip.addEventListener('mouseleave', hideTip);

    const buttons = this.el.nativeElement.querySelectorAll('.ln-btn, .ln-create');
    buttons.forEach((btn: HTMLElement) => {
      btn.addEventListener('mouseenter', () => showTip(btn));
      btn.addEventListener('mouseleave', hideTip);
    });
  }
}
