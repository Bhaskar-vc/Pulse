export type TableVariant = 'default' | 'striped' | 'bordered' | 'minimal';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  numeric?: boolean;
  width?: string;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc';
}
