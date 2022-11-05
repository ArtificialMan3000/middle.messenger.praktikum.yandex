// import { Component } from './Component';
export type TEventsMap = Record<string, EventListener[]>;

export type TComponentProps = Record<string, unknown> & {
  className?: string;
  attr?: Record<string, string>;
  events?: TEventsMap;
};

export type TComponentMeta = {
  tagName: string;
  props: TComponentProps;
};
