import { tv } from 'tailwind-variants';
import { ButtonColor, ButtonRadius, ButtonShape, ButtonSize, ButtonStatus, ButtonVariant } from './button.enums';

export const buttonVariants = tv({
  // appearance-none strips all UA button chrome (the source of the dual-border on dark colors).
  // border-solid + border-transparent gives us a clean 1px invisible border as the sizing base.
  base: 'appearance-none outline-none inline-flex items-center justify-center gap-sm font-medium transition-colors border border-solid border-transparent focus-visible:ring-4',
  variants: {
    variant: {
      [ButtonVariant.SOLID]: 'text-white',
      [ButtonVariant.LIGHT]: '',
      [ButtonVariant.OUTLINED]: '',
      [ButtonVariant.GHOST]: '',
      [ButtonVariant.TINTED]: '',
    },
    color: {
      [ButtonColor.PRIMARY]: '',
      [ButtonColor.SECONDARY]: '',
      [ButtonColor.SUCCESS]: '',
      [ButtonColor.INFO]: '',
      [ButtonColor.WARNING]: '',
      [ButtonColor.DANGER]: '',
    },
    size: {
      [ButtonSize.XS]: 'h-[28px] px-3 text-xs rounded-md',
      [ButtonSize.SM]: 'h-[32px] px-3 text-[13px] rounded-lg',
      [ButtonSize.DEFAULT]: 'h-[36px] px-4 text-sm rounded-lg',
      [ButtonSize.MD]: 'h-[40px] px-5 text-[15px] rounded-lg',
      [ButtonSize.LG]: 'h-[40px] px-5 text-[15px] rounded-lg',
    },
    shape: {
      [ButtonShape.DEFAULT]: '',
      [ButtonShape.SQUARE]: 'aspect-square p-0',
    },
    radius: {
      [ButtonRadius.NONE]: 'rounded-none',
      [ButtonRadius.DEFAULT]: '',
      [ButtonRadius.FULL]: 'rounded-full',
    },
    status: {
      [ButtonStatus.DEFAULT]: '',
      [ButtonStatus.DISABLED]:
        'disabled:bg-[#f2f4f7] disabled:text-[#98a2b3] disabled:border-transparent disabled:cursor-not-allowed disabled:pointer-events-none',
      [ButtonStatus.LOADING]: 'pointer-events-none',
    },
  },
  compoundVariants: [
    // ── Solid ──────────────────────────────────────────────────────────────
    // Solid buttons keep border-transparent from base (no colored border).
    {
      variant: ButtonVariant.SOLID,
      color: ButtonColor.PRIMARY,
      class: 'bg-primary-700 hover:bg-[#1e1e38] focus-visible:ring-[#b9aee9] active:bg-primary-700',
    },
    {
      variant: ButtonVariant.SOLID,
      color: ButtonColor.SECONDARY,
      class: 'bg-secondary-700 hover:bg-[#5531a1] focus-visible:ring-secondary-300 active:bg-secondary-700',
    },
    {
      variant: ButtonVariant.SOLID,
      color: ButtonColor.SUCCESS,
      class: 'bg-success-600 hover:bg-[#0e9155] focus-visible:ring-success-300 active:bg-success-600',
    },
    {
      variant: ButtonVariant.SOLID,
      color: ButtonColor.INFO,
      class: 'bg-info-600 hover:bg-[#0989c5] focus-visible:ring-info-300 active:bg-info-600',
    },
    {
      variant: ButtonVariant.SOLID,
      color: ButtonColor.WARNING,
      class: 'bg-warning-600 hover:bg-[#dc7a05] focus-visible:ring-warning-300 active:bg-warning-600',
    },
    {
      variant: ButtonVariant.SOLID,
      color: ButtonColor.DANGER,
      class: 'bg-error-600 hover:bg-error-700 focus-visible:ring-error-300 active:bg-error-600',
    },

    // ── Light ─────────────────────────────────────────────────────────────
    // No visible border (transparent from base). Exact bg tints from button.html.
    {
      variant: ButtonVariant.LIGHT,
      color: ButtonColor.PRIMARY,
      class: 'bg-[#eeedf6] text-primary-700 hover:bg-[#e0dff0] focus-visible:ring-[#b9aee9] active:bg-[#e0dff0]',
    },
    {
      variant: ButtonVariant.LIGHT,
      color: ButtonColor.SECONDARY,
      class: 'bg-[#f4f0fd] text-secondary-700 hover:bg-[#ede9fb] focus-visible:ring-secondary-300 active:bg-[#ede9fb]',
    },
    {
      variant: ButtonVariant.LIGHT,
      color: ButtonColor.SUCCESS,
      class: 'bg-[#ecfdf5] text-success-800 hover:bg-success-200 focus-visible:ring-success-300 active:bg-success-200',
    },
    {
      variant: ButtonVariant.LIGHT,
      color: ButtonColor.INFO,
      class: 'bg-info-200 text-info-800 hover:bg-[#bae8fd] focus-visible:ring-info-300 active:bg-[#bae8fd]',
    },
    {
      variant: ButtonVariant.LIGHT,
      color: ButtonColor.WARNING,
      class: 'bg-warning-50 text-warning-800 hover:bg-warning-200 focus-visible:ring-warning-300 active:bg-warning-200',
    },
    {
      variant: ButtonVariant.LIGHT,
      color: ButtonColor.DANGER,
      class: 'bg-error-100 text-error-800 hover:bg-error-200 focus-visible:ring-error-300 active:bg-error-200',
    },

    // ── Ghost ─────────────────────────────────────────────────────────────
    // bg-transparent in rest state; tint appears only on hover.
    {
      variant: ButtonVariant.GHOST,
      color: ButtonColor.PRIMARY,
      class: 'bg-transparent text-primary-700 hover:bg-[#eeedf6] focus-visible:ring-[#b9aee9] active:bg-[#e0dff0]',
    },
    {
      variant: ButtonVariant.GHOST,
      color: ButtonColor.SECONDARY,
      class: 'bg-transparent text-secondary-700 hover:bg-[#f4f0fd] focus-visible:ring-secondary-300 active:bg-[#ede9fb]',
    },
    {
      variant: ButtonVariant.GHOST,
      color: ButtonColor.SUCCESS,
      class: 'bg-transparent text-success-800 hover:bg-[#ecfdf5] focus-visible:ring-success-300 active:bg-success-200',
    },
    {
      variant: ButtonVariant.GHOST,
      color: ButtonColor.INFO,
      class: 'bg-transparent text-info-800 hover:bg-info-200 focus-visible:ring-info-300 active:bg-[#bae8fd]',
    },
    {
      variant: ButtonVariant.GHOST,
      color: ButtonColor.WARNING,
      class: 'bg-transparent text-warning-800 hover:bg-warning-50 focus-visible:ring-warning-300 active:bg-warning-200',
    },
    {
      variant: ButtonVariant.GHOST,
      color: ButtonColor.DANGER,
      class: 'bg-transparent text-error-800 hover:bg-error-100 focus-visible:ring-error-300 active:bg-error-200',
    },

    // ── Outlined ──────────────────────────────────────────────────────────
    // bg-white in rest state; tint on hover.
    {
      variant: ButtonVariant.OUTLINED,
      color: ButtonColor.PRIMARY,
      class: 'bg-white text-primary-700 border-primary-700 hover:bg-[#eeedf6] focus-visible:ring-[#b9aee9] active:bg-[#e0dff0]',
    },
    {
      variant: ButtonVariant.OUTLINED,
      color: ButtonColor.SECONDARY,
      class: 'bg-white text-secondary-700 border-secondary-700 hover:bg-[#f4f0fd] focus-visible:ring-secondary-300 active:bg-[#ede9fb]',
    },
    {
      variant: ButtonVariant.OUTLINED,
      color: ButtonColor.SUCCESS,
      class: 'bg-white text-success-800 border-success-600 hover:bg-[#ecfdf5] focus-visible:ring-success-300 active:bg-success-200',
    },
    {
      variant: ButtonVariant.OUTLINED,
      color: ButtonColor.INFO,
      class: 'bg-white text-info-800 border-info-600 hover:bg-info-200 focus-visible:ring-info-300 active:bg-[#bae8fd]',
    },
    {
      variant: ButtonVariant.OUTLINED,
      color: ButtonColor.WARNING,
      class: 'bg-white text-warning-800 border-warning-600 hover:bg-warning-50 focus-visible:ring-warning-300 active:bg-warning-200',
    },
    {
      variant: ButtonVariant.OUTLINED,
      color: ButtonColor.DANGER,
      class: 'bg-white text-error-800 border-error-600 hover:bg-error-100 focus-visible:ring-error-300 active:bg-error-200',
    },

    // ── Tinted ────────────────────────────────────────────────────────────
    // Light tint bg + matching border. Hover darkens the bg slightly (no fill).
    {
      variant: ButtonVariant.TINTED,
      color: ButtonColor.PRIMARY,
      class: 'bg-[#eeedf6] text-primary-700 border-primary-700 hover:bg-[#e0dff0] focus-visible:ring-[#b9aee9] active:bg-[#e0dff0]',
    },
    {
      variant: ButtonVariant.TINTED,
      color: ButtonColor.SECONDARY,
      class: 'bg-[#f4f0fd] text-secondary-700 border-secondary-700 hover:bg-[#ede9fb] focus-visible:ring-secondary-300 active:bg-[#ede9fb]',
    },
    {
      variant: ButtonVariant.TINTED,
      color: ButtonColor.SUCCESS,
      class: 'bg-[#ecfdf5] text-success-800 border-success-600 hover:bg-success-200 focus-visible:ring-success-300 active:bg-success-200',
    },
    {
      variant: ButtonVariant.TINTED,
      color: ButtonColor.INFO,
      class: 'bg-info-200 text-info-800 border-info-600 hover:bg-[#bae8fd] focus-visible:ring-info-300 active:bg-[#bae8fd]',
    },
    {
      variant: ButtonVariant.TINTED,
      color: ButtonColor.WARNING,
      class: 'bg-warning-50 text-warning-800 border-warning-600 hover:bg-warning-200 focus-visible:ring-warning-300 active:bg-warning-200',
    },
    {
      variant: ButtonVariant.TINTED,
      color: ButtonColor.DANGER,
      class: 'bg-error-100 text-error-800 border-error-600 hover:bg-error-200 focus-visible:ring-error-300 active:bg-error-200',
    },
  ],
  defaultVariants: {
    variant: ButtonVariant.SOLID,
    color: ButtonColor.PRIMARY,
    size: ButtonSize.DEFAULT,
    status: ButtonStatus.DEFAULT,
  },
});

export const iconVariants = tv({
  base: 'inline-flex',
  variants: {
    size: {
      [ButtonSize.XS]: 'text-lg',
      [ButtonSize.SM]: 'text-xl',
      [ButtonSize.DEFAULT]: 'text-xl',
      [ButtonSize.MD]: 'text-2xl',
      [ButtonSize.LG]: 'text-3xl',
    },
  },
  defaultVariants: {
    size: ButtonSize.DEFAULT,
    shape: ButtonSize.DEFAULT,
  },
});
