import { TEventListener } from './types';

export class EventBus {
  private listeners: Record<string, TEventListener[]>;

  constructor() {
    this.listeners = {};
  }

  public on(event: string, callback: TEventListener) {
    if (Array.isArray(this.listeners[event])) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  }

  public off(event: string, callback: TEventListener) {
    if (!this.listeners[event]?.length) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  public emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]?.length) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
