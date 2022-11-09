import {
  Component,
  extendClassName,
  TComponentProps,
} from '~src/view/Component';
import tpl from './Input.hbs';
import * as css from './Input.module.scss';

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
    const { isValid, className } = this.props;
    const classValid = isValid ? '' : css.notValid;
    this.element.setAttribute('class', extendClassName(classValid, className));
    return tpl({
      ...this.props,
    });
  }
}
