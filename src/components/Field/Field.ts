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

  render() {
    const {
      className,
      type = '',
      id = '',
      name = '',
      label,
      placeholder = '',
    } = this.props;

    const input: Component = new Input({
      className: css.input as string,
      attr: {
        placeholder,
        type,
        id,
        name,
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
