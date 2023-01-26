import tpl from './Field.hbs';
import sharedCss from '~/src/scss/shared.module.scss';
import css from './Field.module.scss';
import { TComponentProps, Component } from '~/src/view/Component';
import { Input } from '../Input/Input';
import { combineCssModules } from '~/src/view/View';

combineCssModules(css, sharedCss);

type TProps = {
  type?: string;
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  validationText?: string;
  onFocus?: EventListener;
  onBlur?: EventListener;
};

export class Field extends Component<TProps> {
  constructor(props: TComponentProps<TProps>) {
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
      onFocus,
      onBlur,
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
      events: { focus: [onFocus], blur: [onBlur] },
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
