import tpl from './Field.hbs';
import * as css from './Field.module.scss';
import { TComponentProps, Component } from '~/src/view/Component';
import { Input } from '../Input/Input';

type TProps = TComponentProps & {
  type?: string;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
};

export class Field extends Component<TProps> {
  constructor(props: TProps) {
    super(props, 'div');
  }

  // onInputFocus(evt: Event, component: Component) {
  //   const { name = '' } = this.props;
  //   if (fieldHandlers[name]) {
  //     fieldHandlers[name](evt, component);
  //   }
  //   console.log('focus');
  // }

  // onInputBlur(evt: Event, component: Component) {
  //   const { name = '' } = this.props;
  //   if (fieldHandlers[name]) {
  //     fieldHandlers[name](evt, component);
  //   }
  //   console.log('blur');
  // }

  render() {
    const {
      className,
      type = '',
      id = '',
      name = '',
      label,
      placeholder = '',
      onInputFocus = () => {},
      onInputBlur = () => {},
    } = this.props;

    const input: Component = new Input({
      className: css.input as string,
      attr: {
        placeholder,
        type,
        id,
        name,
      },
      events: {
        focus: [(evt) => onInputFocus(evt, input)],
        blur: [(evt) => onInputBlur(evt, input)],
      },
    });

    return this.compile(tpl, {
      className,
      id,
      label,
      Input: input,
      css,
    });
  }
}
