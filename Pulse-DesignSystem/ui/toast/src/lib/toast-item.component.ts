import { AfterViewInit, Component, EventEmitter, Input, NgZone, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from './message';
import { ToastItemCloseEvent } from './toast.interface';
import { toastItemAnimation } from './toast-item.animation';

@Component({
    standalone: true,
    selector: 'vc-toast-item',
    imports: [CommonModule],
    templateUrl: './toast-item.component.html',
    styleUrl: './toast-item.component.scss',
    animations: [toastItemAnimation]
})
export class VcToastItem implements AfterViewInit, OnDestroy {
  @Input() message?: Message;
  @Input() index?: number | null;
  @Input() life?: number;

  @Output() onClose: EventEmitter<ToastItemCloseEvent> = new EventEmitter();
  @Output() onLinkClick: EventEmitter<any> = new EventEmitter();

  timeout: any;

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    this.initTimeout();
  }

  initTimeout() {
    this.zone.runOutsideAngular(() => {
      this.timeout = setTimeout(() => {
        this.onClose.emit({
          index: <number>this.index,
          message: <Message>this.message
        });
      }, this.message?.life || this.life || 3000);
    })
  }

  clearTimeout() {
    if(this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  onCloseIconClick(event: Event) {
    this.clearTimeout();

    this.onClose.emit({
      index: <number>this.index,
      message: <Message>this.message
    })

    event.preventDefault();
  }

  handleLinkClick(event: Event) {
    this.onLinkClick.emit(event);
  }

  ngOnDestroy() {
    //console.log("Index after destroy: ", this.index);
    this.clearTimeout();
  }
}
