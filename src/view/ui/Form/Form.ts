import tpl from './Form.hbs';
import * as css from './Form.module.scss';
import { Component, TComponentProps } from '~/src/view/Component';

type TProps = {
  message?: string;
  errorText?: string;
  fields?: Component[];
  buttons?: Component[];
};

export class Form extends Component<TProps> {
  constructor(props: TComponentProps<TProps>) {
    super(props, 'form');
  }

  render() {
    return this.compile(tpl, { css, ...this.props });
  }
}
