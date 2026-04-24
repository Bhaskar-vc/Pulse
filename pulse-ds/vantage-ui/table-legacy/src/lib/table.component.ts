import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcTag } from '@vantagecircle/vantage-ui/tag';
import { CapitalizeService } from '@vantagecircle/vantage-ui/core';

@Component({
    standalone: true,
    selector: 'vc-legacy-table',
    imports: [CommonModule, VcTag],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class VcLegacyTable implements OnChanges {
  constructor(public capitalizeService: CapitalizeService) {}
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() header: boolean = false;
  @Input() heading: string = 'Table';
  @Input() headingTag: boolean = false;
  @Input() headingTagText = 'Heading Tag';
  @Input() striped: boolean = false;
  @Input() maxHeight?: number;
  @Input() shadow: boolean = true;
  @Input() sortingEnabled: boolean = false;
  @Input() fixFirstColumn: boolean = false;
  dataKeys: string[] = [];
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;
  sortedData: any[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.sortedData = [...this.data];
      this.data.length &&
        (this.dataKeys = Object.keys(this.data[0]).map((key) => key));
    }
  }
  sortData(column: string) {
    if (!this.sortingEnabled) return;
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortedData.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
}
