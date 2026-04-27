import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VTabItem } from './tab-item.component';

@Component({
  standalone: true,
  selector: 'v-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VTabs implements OnChanges, AfterContentInit {
  /** Visual variant */
  @Input() variant: 'line' = 'line';

  /** Size */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Vertical layout */
  @Input() vertical = false;

  /** Initially active tab index */
  @Input() activeIndex = 0;

  /** Emitted when the active tab changes */
  @Output() activeIndexChange = new EventEmitter<number>();

  @ContentChildren(VTabItem) tabItems!: QueryList<VTabItem>;

  tabsClass = '';

  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(): void {
    const parts = [`tabs tabs--${this.variant}`];
    if (this.size !== 'md') parts.push(`tabs--${this.size}`);
    if (this.vertical) parts.push('tabs--vertical');
    this.tabsClass = parts.join(' ');
  }

  ngAfterContentInit(): void {
    this.syncTabs();
    this.tabItems.changes.subscribe(() => this.syncTabs());
  }

  select(index: number): void {
    this.activeIndex = index;
    this.syncTabs();
    this.activeIndexChange.emit(index);
    this.cdr.markForCheck();
  }

  private syncTabs(): void {
    this.tabItems.forEach((item, i) => {
      item.index = i;
      item.isActive = i === this.activeIndex;
      item.cdr.markForCheck();
    });
  }
}
