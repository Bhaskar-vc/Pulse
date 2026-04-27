import { tv } from 'tailwind-variants';

export const spinnerVariants = tv({
  base: 'spinner',
  variants: {
    color: {
      primary: '',
      secondary: '',
      success: '',
      info: '',
      warning: '',
      danger: '',
    },
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      default: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    },
    theme: {
      light: '',
      dark: '',
    },
  },
  compoundVariants: [
    // Light theme color variants
    {
      color: 'primary',
      theme: 'light',
      class: 'text-primary-200',
    },
    {
      color: 'secondary',
      theme: 'light',
      class: 'text-secondary-400',
    },
    {
      color: 'success',
      theme: 'light',
      class: 'text-success-400',
    },
    {
      color: 'info',
      theme: 'light',
      class: 'text-info-400',
    },
    {
      color: 'warning',
      theme: 'light',
      class: 'text-warning-400',
    },
    {
      color: 'danger',
      theme: 'light',
      class: 'text-error-400',
    },

    // Dark theme color variants
    {
      color: 'primary',
      theme: 'dark',
      class: 'text-primary-500',
    },
    {
      color: 'secondary',
      theme: 'dark',
      class: 'text-secondary-600',
    },
    {
      color: 'success',
      theme: 'dark',
      class: 'text-success-600',
    },
    {
      color: 'info',
      theme: 'dark',
      class: 'text-info-600',
    },
    {
      color: 'warning',
      theme: 'dark',
      class: 'text-warning-600',
    },
    {
      color: 'danger',
      theme: 'dark',
      class: 'text-error-600',
    },
  ],

  // compoundVariants: [
  //   // Light theme color variants
  //   {
  //     color: 'primary',
  //     theme: 'light',
  //     class: 'text-primary-500',
  //   },
  //   {
  //     color: 'secondary',
  //     theme: 'light',
  //     class: 'text-secondary-600',
  //   },
  //   {
  //     color: 'success',
  //     theme: 'light',
  //     class: 'text-success-600',
  //   },
  //   {
  //     color: 'info',
  //     theme: 'light',
  //     class: 'text-info-600',
  //   },
  //   {
  //     color: 'warning',
  //     theme: 'light',
  //     class: 'text-warning-600',
  //   },
  //   {
  //     color: 'danger',
  //     theme: 'light',
  //     class: 'text-error-600',
  //   },

  //   // Dark theme color variants
  //   {
  //     color: 'primary',
  //     theme: 'dark',
  //     class: 'text-primary-200',
  //   },
  //   {
  //     color: 'secondary',
  //     theme: 'dark',
  //     class: 'text-secondary-400',
  //   },
  //   {
  //     color: 'success',
  //     theme: 'dark',
  //     class: 'text-success-400',
  //   },
  //   {
  //     color: 'info',
  //     theme: 'dark',
  //     class: 'text-info-400',
  //   },
  //   {
  //     color: 'warning',
  //     theme: 'dark',
  //     class: 'text-warning-400',
  //   },
  //   {
  //     color: 'danger',
  //     theme: 'dark',
  //     class: 'text-error-400',
  //   },
  // ],

  defaultVariants: {
    color: 'primary',
    size: 'default',
    theme: 'light',
  },
});
