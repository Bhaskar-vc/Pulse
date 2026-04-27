import { Component, ElementRef, HostListener, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { VDropdownMenuContent } from './dropdown-menu-content.component';
import { DropdownMenuConfig } from './dropdown-menu.types';
import { VDropdownMenuService } from './dropdown-menu.service';

@Component({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'v-dropdown-menu-trigger',
  template: ` <ng-content></ng-content> `,
  standalone: true,
})
export class VDropdownMenuTrigger implements OnDestroy {
  @Input() dropdownConfig: DropdownMenuConfig = {};

  private overlayRef: OverlayRef | null = null;
  private contentComponent: VDropdownMenuContent | null = null;
  private isOpen = false;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private dropdownService: VDropdownMenuService,
  ) {}

  setContentTemplate(content: VDropdownMenuContent) {
    this.contentComponent = content;
  }

  // setContentTemplate(template: TemplateRef<unknown>) {
  //   this.contentTemplate = template;
  // }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.isOpen ? this.close() : this.open();
  }

  private open() {
    const content = this.dropdownService.getContent();

    if (!content || this.overlayRef) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(this.getPositions());

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy,
    });

    // console.log(content);

    const portal = new ComponentPortal(VDropdownMenuContent);
    const componentRef = this.overlayRef.attach(portal);

    const originalEl = content.elementRef.nativeElement;
    const cloned = originalEl.cloneNode(true) as HTMLElement;

    componentRef.instance.size = content.size;
    componentRef.instance.elevation = content.elevation;
    componentRef.instance.setContent(cloned);

    this.isOpen = true;

    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.overlayRef.overlayElement.addEventListener('dropdown-close', () => this.close());
  }

  private close() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.isOpen = false;
    }
  }

  private getPositions(): ConnectedPosition[] {
    return [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      },
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
      },
    ];
  }

  ngOnDestroy() {
    this.close();
  }
}
