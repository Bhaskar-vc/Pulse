export type StepState = 'pending' | 'active' | 'done' | 'error';
export type StepsSize = 'sm' | 'md' | 'lg' | 'dot';
export type StepsVariant = 'classic' | 'pill';
export type StepsTheme = 'default' | 'light' | 'dark';

export interface StepDef {
  title: string;
  desc?: string;
  state?: StepState;
}
