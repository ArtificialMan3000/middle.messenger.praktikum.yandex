import { isFieldValid } from '~src/model/features/fieldValidation';
import type { Component } from '~src/view/Component';

type TEventHandler = (evt: Event, Component?: Component) => unknown;

export const fieldHandler: TEventHandler = (evt, Component) => {
  const { name, value } = evt.target as HTMLInputElement;
  const isValid = isFieldValid(name, value);
  console.log(isValid);
  Component?.setProps({ isValid });
};
