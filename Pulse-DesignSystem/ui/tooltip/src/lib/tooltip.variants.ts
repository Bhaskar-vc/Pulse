import { tv } from 'tailwind-variants';

export const tooltipVariants = tv({
  base: ['relative', 'px-sm', 'py-2xs', 'text-sm', 'rounded-sm', 'shadow-lg', 'pointer-events-none', 'break-words'],
  variants: {
    color: {
      default: 'bg-neutral-900 text-white',
      primary: 'bg-primary-500 text-white',
      secondary: 'bg-secondary-600 text-white',
      success: 'bg-success-600 text-white',
      info: 'bg-info-600 text-white',
      danger: 'bg-error-600 text-white',
      neutral: 'bg-neutral-50 text-primary-400',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

export const arrowVariants = tv({
  base: ['absolute', 'w-[6px]', 'h-[6px]', 'rotate-45'],
  variants: {
    color: {
      default: 'bg-primary-500',
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-600',
      success: 'bg-success-600',
      info: 'bg-info-600',
      danger: 'bg-error-600',
      neutral: 'bg-neutral-50',
    },
    placement: {
      'top-start': '-bottom-[3px] left-[8px]',
      top: '-bottom-[3px] left-1/2 -translate-x-1/2',
      'top-end': '-bottom-[3px] right-[8px]',

      'bottom-start': '-top-[3px] left-[8px]',
      bottom: '-top-[3px] left-1/2 -translate-x-1/2',
      'bottom-end': '-top-[3px] right-[8px]',

      'left-start': '-right-[3px] top-[8px]',
      left: '-right-[3px] top-1/2 -translate-y-1/2',
      'left-end': '-right-[3px] bottom-[8px]',

      'right-start': '-left-[3px] top-[8px]',
      right: '-left-[3px] top-1/2 -translate-y-1/2',
      'right-end': '-left-[3px] bottom-[8px]',
    },
  },
  defaultVariants: {
    color: 'default',
    placement: 'top',
  },
});
