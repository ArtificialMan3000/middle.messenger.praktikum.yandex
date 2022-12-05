import type { Component } from './Component';

export type TEventsMap = Record<string, EventListener[]>;

export type TBaseProps = {
  className?: string;
  attr?: Record<string, string>;
  events?: TEventsMap;
  children?: TComponentChildren;
};

export type TComponentProps<
  TInheritorProps extends Record<string, unknown> = Record<string, unknown>
> = TInheritorProps & Record<string, unknown> & TBaseProps;

export type TComponentChildren = Component | string;

export type TComponentMeta<
  TInheritorProps extends Record<string, unknown> = Record<string, unknown>
> = {
  tagName: string;
  props: TComponentProps<TInheritorProps>;
};

export interface IComponentConstructor<
  TInheritorProps extends Record<string, unknown> = Record<string, unknown>
> {
  EVENTS: Record<string, string>;
  new (props: TComponentProps<TInheritorProps>, tagName?: string): Component;
}
