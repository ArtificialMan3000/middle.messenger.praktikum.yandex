import type { TState } from './types';
import { set } from '~/src/utils/functions';
import { EventBus } from '../utils/EventBus';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  #state: TState = {};

  getState() {
    return this.#state;
  }

  setState(path: string, value: unknown) {
    set(this.#state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store();

// @ts-ignore
window.state = store.getState();
