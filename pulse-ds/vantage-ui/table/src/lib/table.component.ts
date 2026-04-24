import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcTag } from '@vantagecircle/vantage-ui/tag';

@Component({
    standalone: true,
    selector: 'vc-table',
    imports: [CommonModule, VcTag],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class VcTable {
  @Input() get value(): any[] {
    return this._value;
  }

  set value(val: any[]) {
    this._value = val;
  }

  _value: any[] = [];

  @Input() shadow: boolean = true;
  @Input() header: boolean = false;
  @Input() heading: string = 'Table';
  @Input() headingTag: boolean = false;
  @Input() headingTagText: string = 'Heading Tag';
  @Input() maxHeight: number = 899;
}
