import { tv } from 'tailwind-variants';

export const dropdownMenuContentVariants = tv({
  base: [
    'z-50',
    'min-w-32',
    'overflow-hidden',
    'rounded-md',
    'border',
    'border-gray-200',
    'bg-white',
    'p-1',
    'text-gray-950',
    'shadow-md',
    'data-[state=open]:animate-in',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    'data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95',
    'data-[state=open]:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',
  ],
  variants: {
    size: {
      sm: 'min-w-24 p-0.5',
      md: 'min-w-32 p-1',
      lg: 'min-w-48 p-1.5',
    },
    elevation: {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    },
  },
  defaultVariants: {
    size: 'md',
    elevation: 'md',
  },
});

export const dropdownMenuItemVariants = tv({
  base: [
    'relative',
    'flex',
    'cursor-default',
    'select-none',
    'items-center',
    'gap-2',
    'rounded-sm',
    'px-2',
    'py-1.5',
    'text-sm',
    'outline-none',
    'transition-colors',
    'focus:bg-gray-100',
    'focus:text-gray-900',
    'data-[disabled]:pointer-events-none',
    'data-[disabled]:opacity-50',
    '[&_svg]:pointer-events-none',
    '[&_svg]:size-4',
    '[&_svg]:shrink-0',
  ],
  variants: {
    inset: {
      true: 'pl-8',
    },
    hover: {
      true: 'hover:bg-gray-100 hover:text-gray-900',
      false: 'hover:bg-transparent',
    },
    size: {
      sm: 'px-1.5 py-1 text-xs gap-1.5',
      md: 'px-2 py-1.5 text-sm gap-2',
      lg: 'px-3 py-2 text-base gap-2.5',
    },
    variant: {
      default: '',
      destructive: 'text-red-600 focus:bg-red-50 focus:text-red-900 hover:bg-red-50 hover:text-red-900',
      success: 'text-green-600 focus:bg-green-50 focus:text-green-900 hover:bg-green-50 hover:text-green-900',
    },
  },
  defaultVariants: {
    hover: true,
    size: 'md',
    variant: 'default',
  },
});

export const dropdownMenuGroupVariants = tv({
  base: ['overflow-hidden', 'p-1', 'text-gray-950'],
  variants: {
    spacing: {
      none: 'p-0',
      sm: 'p-0.5',
      md: 'p-1',
      lg: 'p-1.5',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

export const dropdownMenuDividerVariants = tv({
  base: ['-mx-1', 'my-1', 'h-px', 'bg-gray-200'],
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'w-px h-full',
    },
    spacing: {
      none: 'my-0',
      sm: 'my-0.5',
      md: 'my-1',
      lg: 'my-1.5',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    spacing: 'md',
  },
});

export const dropdownMenuLabelVariants = tv({
  base: ['px-2', 'py-1.5', 'text-sm', 'font-semibold', 'text-gray-900'],
  variants: {
    size: {
      sm: 'px-1.5 py-1 text-xs',
      md: 'px-2 py-1.5 text-sm',
      lg: 'px-3 py-2 text-base',
    },
    variant: {
      default: 'text-gray-900',
      muted: 'text-gray-500',
      accent: 'text-blue-600',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

export const dropdownMenuShortcutVariants = tv({
  base: ['ml-auto', 'text-xs', 'tracking-widest', 'text-gray-500'],
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
    },
    variant: {
      default: 'text-gray-500',
      muted: 'text-gray-400',
      accent: 'text-gray-600',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});
