import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'v-button-group',
  standalone: true,
  imports: [],
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VButtonGroup {
  /** Additional CSS class(es) applied to the group wrapper */
  @Input() className = '';
}
