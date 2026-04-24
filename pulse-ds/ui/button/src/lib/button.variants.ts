import { tv } from 'tailwind-variants';
import { ButtonColor, ButtonRadius, ButtonShape, ButtonSize, ButtonStatus, ButtonVariant } from './button.enums';

export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-sm font-medium transition-colors focus:outline-none focus-visible:ring-4',
  variants: {
    variant: {
      [ButtonVariant.SOLID]: 'text-white',
      [ButtonVariant.LIGHT]: '',
      [ButtonVariant.OUTLINED]: 'border',
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
      [ButtonSize.XS]: 'h-[28px] px-3 text-xs rounded',
      [ButtonSize.SM]: 'h-[34px] px-4 text-sm rounded',
      [ButtonSize.DEFAULT]: 'h-10 px-5 text-base rounded',
      [ButtonSize.MD]: 'h-11 px-5 text-base rounded-md',
      [ButtonSize.LG]: 'h-12 px-6 text-lg rounded-lg',
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
        'disabled:text-neutral-300 disabled:bg-neutral-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-50 disabled:focus:bg-neutral-50 disabled:focus-visible:bg-neutral-50 disabled:active:bg-neutral-50',
      [ButtonStatus.LOADING]: 'pointer-events-none',
    },
  },
  compoundVariants: [
    // Solid variants
    {
      variant: ButtonVariant.SOLID,
      color: ButtonColor.PRIMARY,
      class:
        'bg-primary-500 hover:bg-primary-400 focus-visible:bg-primary-400 focus-visible:ring-primary-500 active:bg-primary-500',
    },
    {
      variant: ButtonVariant.SOLID,
      color: ButtonColor.SECONDARY,
      class:
        'bg-secondary-600 hover:bg-secondary-500 focus-visible:bg-secondary-500 focus-visible:ring-secondary-600 active:bg-secondary-600',
    },
    {
      variant: ButtonVariant.SOLID,
      color: ButtonColor.SUCCESS,
      class:
        'bg-success-600 hover:bg-success-500 focus-visible:bg-success-500 focus-visible:ring-success-600 active:bg-success-600',
    },
    {
      variant: ButtonVariant.SOLID,
      color: ButtonColor.INFO,
      class: 'bg-info-600 hover:bg-info-500 focus-visible:bg-info-500 focus-visible:ring-info-600 active:bg-info-600',
    },
    {
      variant: ButtonVariant.SOLID,
      color: ButtonColor.WARNING,
      class:
        'bg-warning-600 hover:bg-warning-500 focus-visible:bg-warning-500 focus-visible:ring-warning-600 active:bg-warning-600',
    },
    {
      variant: ButtonVariant.SOLID,
      color: ButtonColor.DANGER,
      class:
        'bg-error-600 hover:bg-error-500 focus-visible:bg-error-500 focus-visible:ring-error-600 active:bg-error-600',
    },

    // Light variants
    {
      variant: ButtonVariant.LIGHT,
      color: ButtonColor.PRIMARY,
      class:
        'text-primary-500 bg-primary-25 hover:bg-primary-50 focus-visible:ring-primary-500 focus-visible:bg-primary-50 active:bg-primary-100',
    },
    {
      variant: ButtonVariant.LIGHT,
      color: ButtonColor.SECONDARY,
      class:
        'text-secondary-600 bg-secondary-50 hover:bg-secondary-100 focus-visible:ring-secondary-500 focus-visible:bg-secondary-100 active:bg-secondary-200',
    },
    {
      variant: ButtonVariant.LIGHT,
      color: ButtonColor.SUCCESS,
      class:
        'text-success-600 bg-success-50 hover:bg-success-100 focus-visible:ring-success-500 focus-visible:bg-success-100 active:bg-success-200',
    },
    {
      variant: ButtonVariant.LIGHT,
      color: ButtonColor.INFO,
      class:
        'text-info-600 bg-info-50 hover:bg-info-100 focus-visible:ring-info-500 focus-visible:bg-info-100 active:bg-info-200',
    },
    {
      variant: ButtonVariant.LIGHT,
      color: ButtonColor.WARNING,
      class:
        'text-warning-600 bg-warning-50 hover:bg-warning-100 focus-visible:ring-warning-500 focus-visible:bg-warning-100 active:bg-warning-200',
    },
    {
      variant: ButtonVariant.LIGHT,
      color: ButtonColor.DANGER,
      class:
        'text-error-600 bg-error-50 hover:bg-error-100 focus-visible:ring-error-500 focus-visible:bg-error-100 active:bg-error-200',
    },

    // Outlined variants
    {
      variant: ButtonVariant.OUTLINED,
      color: ButtonColor.PRIMARY,
      class:
        'text-primary-500 border-neutral-200 hover:bg-primary-25 focus-visible:ring-primary-25 focus-visible:bg-primary-25 active:bg-primary-50',
    },
    {
      variant: ButtonVariant.OUTLINED,
      color: ButtonColor.SECONDARY,
      class:
        'text-secondary-600 border-secondary-300 hover:bg-secondary-50 focus-visible:ring-secondary-50 focus-visible:bg-secondary-50 active:bg-secondary-100',
    },
    {
      variant: ButtonVariant.OUTLINED,
      color: ButtonColor.SUCCESS,
      class:
        'text-success-600 border-success-300 hover:bg-success-50 focus-visible:ring-success-50 focus-visible:bg-success-50 active:bg-success-100',
    },
    {
      variant: ButtonVariant.OUTLINED,
      color: ButtonColor.INFO,
      class:
        'text-info-600 border-info-300 hover:bg-info-50 focus-visible:ring-info-50 focus-visible:bg-info-50 active:bg-info-100',
    },
    {
      variant: ButtonVariant.OUTLINED,
      color: ButtonColor.WARNING,
      class:
        'text-warning-600 border-warning-300 hover:bg-warning-50 focus-visible:ring-warning-50 focus-visible:bg-warning-50 active:bg-warning-100',
    },
    {
      variant: ButtonVariant.OUTLINED,
      color: ButtonColor.DANGER,
      class:
        'text-error-600 border-error-300 hover:bg-error-50 focus-visible:ring-error-50 focus-visible:bg-error-50 active:bg-error-100',
    },

    // Ghost variants
    {
      variant: ButtonVariant.GHOST,
      color: ButtonColor.PRIMARY,
      class:
        'text-primary-500 hover:bg-primary-25 focus-visible:ring-primary-25 focus-visible:bg-primary-25 active:bg-primary-50',
    },
    {
      variant: ButtonVariant.GHOST,
      color: ButtonColor.SECONDARY,
      class:
        'text-secondary-600 hover:bg-secondary-50 focus-visible:ring-secondary-50 focus-visible:bg-secondary-50 active:bg-secondary-100',
    },
    {
      variant: ButtonVariant.GHOST,
      color: ButtonColor.SUCCESS,
      class:
        'text-success-600 hover:bg-success-50 focus-visible:ring-success-50 focus-visible:bg-success-50 active:bg-success-100',
    },
    {
      variant: ButtonVariant.GHOST,
      color: ButtonColor.INFO,
      class: 'text-info-600 hover:bg-info-50 focus-visible:ring-info-50 focus-visible:bg-info-50 active:bg-info-100',
    },
    {
      variant: ButtonVariant.GHOST,
      color: ButtonColor.WARNING,
      class:
        'text-warning-600 hover:bg-warning-50 focus-visible:ring-warning-50 focus-visible:bg-warning-50 active:bg-warning-100',
    },
    {
      variant: ButtonVariant.GHOST,
      color: ButtonColor.DANGER,
      class:
        'text-error-600 hover:bg-error-50 focus-visible:ring-error-50 focus-visible:bg-error-50 active:bg-error-100',
    },

    // Tinted variants
    {
      variant: ButtonVariant.TINTED,
      color: ButtonColor.PRIMARY,
      class:
        'text-primary-500 bg-primary-25 border border-primary-500 hover:text-white hover:bg-primary-500 hover:border-primary-500 focus-visible:ring-primary-25 focus-visible:text-white focus-visible:bg-primary-500 focus-visible:border-primary-500 active:bg-primary-400 active:border-primary-400',
    },
    {
      variant: ButtonVariant.TINTED,
      color: ButtonColor.SECONDARY,
      class:
        'text-secondary-600 bg-secondary-50 border border-secondary-500 hover:text-white hover:bg-secondary-600 hover:border-secondary-600 focus-visible:ring-secondary-100 focus-visible:text-white focus-visible:bg-secondary-600 focus-visible:border-secondary-600 active:bg-secondary-500 active:border-secondary-500',
    },
    {
      variant: ButtonVariant.TINTED,
      color: ButtonColor.SUCCESS,
      class:
        'text-success-600 bg-success-50 border border-success-500 hover:text-white hover:bg-success-600 hover:border-success-600 focus-visible:ring-success-100 focus-visible:text-white focus-visible:bg-success-600 focus-visible:border-primary-600 active:bg-success-500 active:border-success-500',
    },
    {
      variant: ButtonVariant.TINTED,
      color: ButtonColor.INFO,
      class:
        'text-info-600 bg-info-50 border border-info-500 hover:text-white hover:bg-info-600 hover:border-info-600 focus-visible:ring-info-100 focus-visible:text-white focus-visible:bg-info-600 focus-visible:border-info-600 active:bg-info-500 active:border-info-500',
    },
    {
      variant: ButtonVariant.TINTED,
      color: ButtonColor.WARNING,
      class:
        'text-warning-600 bg-warning-50 border border-warning-500 hover:text-white hover:bg-warning-600 hover:border-warning-600 focus-visible:ring-warning-100 focus-visible:text-white focus-visible:bg-warning-600 focus-visible:border-warning-600 active:bg-warning-500 active:border-warning-500',
    },
    {
      variant: ButtonVariant.TINTED,
      color: ButtonColor.DANGER,
      class:
        'text-error-600 bg-error-50 border border-error-500 hover:text-white hover:bg-error-600 hover:border-error-600 focus-visible:ring-error-100 focus-visible:text-white focus-visible:bg-error-600 focus-visible:border-error-600 active:bg-error-500 active:border-error-500',
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
