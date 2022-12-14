import tpl from './FullAvatar.hbs';
import * as css from './FullAvatar.module.scss';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '~src/view/Component';

type TProps = TComponentProps;

export class FullAvatar extends Component<TProps> {
  constructor(props: TProps) {
    const className = extendClassName(css.avatar, props.className);
    super({ ...props, className }, 'div');
  }

  render() {
    const { imageSrc, name, width = 300, height = 300 } = this.props;
    return this.compile(tpl, { imageSrc, name, width, height, css });
  }
}
