import tpl from './Backlink.hbs';
import * as css from './Backlink.module.scss';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '~/src/view/Component';

type TProps = TComponentProps;

export class Backlink extends Component<TProps> {
  constructor(props?: TProps) {
    const className = extendClassName(css.link, props?.className);
    super({ ...props, className }, 'a');
  }

  render() {
    const { text } = this.props;
    return this.compile(tpl, { text, css });
  }
}
