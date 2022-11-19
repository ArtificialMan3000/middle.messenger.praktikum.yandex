import tpl from './Field.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './Field.module.scss';
import { TComponentProps, Component } from '~/src/view/Component';
import { Input } from '../Input/Input';
import { combineCssModules } from '~src/view/View';

combineCssModules(css, sharedCss);

type TProps = TComponentProps & {
  type?: string;
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  validationText?: string;
};

export class Field extends Component<TProps> {
  constructor(props: TProps) {
    super(props, 'div');
  }

  render() {
    const {
      className,
      type = '',
      id = '',
      name = '',
      label,
      value = '',
      placeholder = '',
      validationText = '',
    } = this.props;

    const input: Component = new Input({
      className: css.input as string,
      attr: {
        placeholder,
        type,
        id,
        name,
        value,
      },
    });

    return this.compile(tpl, {
      className,
      id,
      label,
      Input: input,
      css,
      validationText,
    });
  }
}
