export interface Message {
    status: 'default' | 'success' | 'warning' | 'error' | 'hint' | string;
    heading?: string;
    description?: string;
    key?: string;
    life?: number;
    id?: any;
    dismiss?: boolean;
    link?: string;
    accentBorder?: boolean;
}