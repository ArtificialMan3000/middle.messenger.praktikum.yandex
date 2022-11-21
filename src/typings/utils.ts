import { Component } from '../view/Component';

export type TConstructor<T> = new (...args: any) => T;

export type TComponentPropsType<T extends Component> = T['props'];
