export interface DropdownItem {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  danger?: boolean;
  dividerBefore?: boolean;
  group?: string;
  icon?: string;       // raw SVG markup string
  avatar?: string;     // initials (e.g. "JL")
  avatarBg?: string;   // background color
  avatarColor?: string;// text color
  badge?: string;      // badge text
}
