import tpl from './Button.hbs';
import * as css from './Button.module.scss';
import { Component, TComponentProps } from '~/src/view/Component';
import { makeClassNames } from '~/src/view/View';

type TProps = {
  text?: string;
  attributes?: {
    type?: string;
  };
};

export class Button extends Component<TProps> {
  type: string;

  constructor(props: TComponentProps<TProps>) {
    const { className = '', attr } = props;

    const newClassName = makeClassNames(css.button, className);

    const type = attr?.type || 'button';

    super({ ...props, className: newClassName, attr: { type } }, 'button');
  }

  render() {
    const { text } = this.props;

    return this.compile(tpl, { text });
  }
}
