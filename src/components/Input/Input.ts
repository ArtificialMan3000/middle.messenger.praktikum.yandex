import { Component, TComponentProps } from '~/src/view/Component';
import tpl from './Input.hbs';

type TProps = TComponentProps & {
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  isValid?: boolean;
};

export class Input extends Component<TProps> {
  constructor(props: TProps) {
    super(props, 'input');
  }

  render() {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}
