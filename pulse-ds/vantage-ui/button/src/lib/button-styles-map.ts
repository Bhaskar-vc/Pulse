import { elementTypes, colors, sizes } from '@vantagecircle/vantage-ui/core';

export const buttonTypesMap = {
  [elementTypes.PRIMARY]: 'btn-type-primary',
  [elementTypes.GHOST]: 'btn-type-ghost',
  [elementTypes.PILL]: 'btn-type-pill',
  [elementTypes.LINK]: 'btn-type-link',
};

export const buttonVariantsMap = {
  [colors.DEFAULT]: 'btn-variant-default',
  [colors.SECONDARY]: 'btn-variant-secondary',
  [colors.SUCCESS]: 'btn-variant-success',
  [colors.INFO]: 'btn-variant-info',
  [colors.WARNING]: 'btn-variant-warning',
  [colors.ERROR]: 'btn-variant-error',
  [colors.CANCEL]: 'btn-variant-cancel',
};

export const buttonSizesMap = {
  [sizes.SMALL]: 'btn-size-sm',
  [sizes.DEFAULT]: 'btn-size-default',
  [sizes.MEDIUM]: 'btn-size-md',
  [sizes.LARGE]: 'btn-size-lg',
};
