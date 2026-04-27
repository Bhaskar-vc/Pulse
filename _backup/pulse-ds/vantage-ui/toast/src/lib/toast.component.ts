import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService } from './toast.service';
import { Message } from './message';
import { VcToastItem } from './toast-item.component';
import { ToastCloseEvent, ToastItemCloseEvent, ToastPositionType } from './toast.interface';
import { toastContainerAnimation } from './toast-container.animation';

@Component({
    standalone: true,
    selector: 'vc-toast',
    imports: [CommonModule, VcToastItem],
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss',
    animations: [toastContainerAnimation]
})
export class VcToast implements OnInit, OnDestroy {
  @Input() heading?: string;
  @Input() visible: boolean = false;
  @Input() status: 'default' | 'success' | 'warning' | 'error' | string | undefined;
  @Input() key?: string;
  @Input() life: number = 3000;
  /**
   * Position of the toast in viewport.
   * @group Props
   */
  @Input()
  get position(): ToastPositionType {
    return this._position;
  }

  set position(value: ToastPositionType) {
    this._position = value;
    this.cd.markForCheck();
  }

  @Output() onClose: EventEmitter<ToastCloseEvent> = new EventEmitter<ToastCloseEvent>();

  messageSubscription?: Subscription;
  clearSubscription?: Subscription;
  messages?: Message[] | null;
  _position: ToastPositionType = 'top-right';

  constructor(public toastService: ToastService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.messageSubscription = this.toastService.messageObserver.subscribe((messages) => {
      if (messages) {
        if(Array.isArray(messages)) {
          const filteredMessages = messages.filter((m) => this.canAdd(m));
          this.add(filteredMessages);
        } else if (this.canAdd(messages)) {
          this.add([messages]);
        }
      }
    });

    this.clearSubscription = this.toastService.clearObserver.subscribe((key) => {
      if(key) {
        if(this.key === key) {
          this.messages = null;
        } else {
          this.messages = null;
        }
      }

      this.cd.markForCheck();
    });
  }

  add(messages: Message[]): void {
    this.messages = this.messages ? [...this.messages, ...messages] : [...messages];

    this.cd.markForCheck();
  }

  canAdd(message: Message): boolean {
    let allow = this.key === message.key;

    return allow;
  }

  onMessageClose(event: ToastItemCloseEvent) {
    this.messages?.splice(event.index, 1);

    this.onClose.emit({
      message: event.message
    });

    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if(this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    if(this.clearSubscription) {
      this.clearSubscription.unsubscribe();
    }
  }
}
