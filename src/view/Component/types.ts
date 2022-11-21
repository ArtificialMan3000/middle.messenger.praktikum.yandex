import type { Component } from './Component';

export type TEventsMap = Record<string, EventListener[]>;

export type TComponentProps = Record<string, unknown> & {
  className?: string;
  attr?: Record<string, string>;
  events?: TEventsMap;
  children?: TComponentChildren;
};

export type TComponentChildren = Component | string;

export type TComponentMeta = {
  tagName: string;
  props: TComponentProps;
};
