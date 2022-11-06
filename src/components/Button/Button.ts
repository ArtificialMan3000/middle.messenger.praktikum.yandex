import tpl from './Button.hbs';
import * as css from './Button.module.scss';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '../../view/Component';

type TProps = TComponentProps & {
  text?: string;
  attributes?: {
    type?: string;
  };
};

export class Button extends Component {
  type: string;

  constructor(props: TProps) {
    const { className = '', attributes } = props;
    const newClassName = extendClassName(css.button, className);
    super({ ...props, className: newClassName }, 'button');

    this.type = attributes?.type || 'button';
  }

  render() {
    console.log('button render');

    const { text } = this.props;

    return tpl({ text });
  }
}

// const button = new Button({
//   tagName: 'a',
// });

// export const Button = ({
//   className,
//   href,
//   type = 'button',
//   text,
// }: Properties) => {
//   return tpl({ className, href, type, text, css });
// };
