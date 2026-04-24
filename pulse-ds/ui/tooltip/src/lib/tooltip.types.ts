export type TooltipColor = 'default' | 'primary' | 'secondary' | 'success' | 'info' | 'danger' | 'neutral';

export type TooltipPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'right-start'
  | 'right'
  | 'right-end';

export interface TooltipPosition {
  top: number;
  left: number;
}
