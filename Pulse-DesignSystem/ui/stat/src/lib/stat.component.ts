import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

export type StatLayout = 'horizontal' | 'vertical';
export type StatIconColor = 'purple' | 'green' | 'blue' | 'orange' | 'red' | 'none';

@Component({
  standalone: true,
  selector: 'v-stat',
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VStat implements OnChanges {
  /** Row label above the value */
  @Input() title = '';

  /** Primary metric — the big number */
  @Input() value = '';

  /** Supporting text below the value */
  @Input() desc = '';

  /** Trend text (e.g. "+12.5% from last month") */
  @Input() trend = '';

  /** Trend direction: 'up' | 'down' | 'neutral' */
  @Input() trendDir: 'up' | 'down' | 'neutral' = 'neutral';

  /** Icon background color */
  @Input() iconColor: StatIconColor = 'none';

  /** Center-align content */
  @Input() centered = false;

  iconClass = '';

  ngOnChanges(): void {
    const map: Record<StatIconColor, string> = {
      purple: 'stat-figure-purple',
      green:  'stat-figure-green',
      blue:   'stat-figure-blue',
      orange: 'stat-figure-orange',
      red:    'stat-figure-red',
      none:   '',
    };
    this.iconClass = map[this.iconColor] ?? '';
  }
}
