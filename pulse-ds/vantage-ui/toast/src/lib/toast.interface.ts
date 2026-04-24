import { Message } from "./message";

export interface ToastCloseEvent {
    message: Message;
}

export interface ToastItemCloseEvent extends ToastCloseEvent {
    index: number;
}

export type ToastPositionType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'top-center' | 'bottom-center';