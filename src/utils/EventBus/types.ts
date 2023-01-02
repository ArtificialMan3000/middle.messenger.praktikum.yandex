export type TEventListener = (...args: unknown[]) => void | unknown;

export interface IEventBus {
  listeners: Record<string, EventListener[]>;
}
