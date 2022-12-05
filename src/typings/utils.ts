import { Component } from '../view/Component';

export type TConstructor<TInstance> = new (...args: any) => TInstance;

export type TComponentPropsType<T extends Component> = T['props'];

export interface TClass<TInstance> {
  new (...args: any): TInstance;
}
