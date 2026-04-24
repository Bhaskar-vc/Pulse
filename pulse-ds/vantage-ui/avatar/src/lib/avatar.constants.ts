export const avatarTypesMap = {
  IMAGE: 'image',
  PLACEHOLDER: 'placeholder',
  TEXT: 'text',
} as const;

export type VcAvatarType = (typeof avatarTypesMap)[keyof typeof avatarTypesMap];

export const avatarSizesMap = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  XXL: '2xl',
} as const;

export type VcAvatarSize = (typeof avatarSizesMap)[keyof typeof avatarSizesMap];

export const avatarStatusMap = {
  ONLINE: 'online',
  OFFLINE: 'offline',
} as const;

export type VcAvatarStatus =
  (typeof avatarStatusMap)[keyof typeof avatarStatusMap];
