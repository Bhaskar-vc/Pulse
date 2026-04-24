import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcButton } from '@vantagecircle/vantage-ui/button';

@Component({
    standalone: true,
    selector: 'vc-modal',
    imports: [CommonModule, VcButton],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss'
})
export class VcModal {
  @Input() title?: string = 'Modal title';
  @Input() type?: 'success' | 'warning' | 'error' | 'access request' =
    'success';
  @Input() icon?: string;
  @Input() modalType?: 'default' | 'confirm' | string = 'default';
  @Input() visible: boolean = false;
  @Input() showCloseButton: boolean = true;

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter();
  @Output() closeEvent = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  close(): void {
    //this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  submit(): void {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }
}
