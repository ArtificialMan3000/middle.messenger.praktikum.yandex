import tpl from './Window.hbs';
import * as css from './Window.module.scss';
import { Component, TComponentProps } from '~/src/view/Component';
import { extendClassName } from '~/src/view/View';

export class Window extends Component {
  constructor(props: TComponentProps) {
    const className = extendClassName(css.window, props.className);
    super({ ...props, className }, 'div');
  }

  render() {
    const { header, content, errorText } = this.props;
    const comp = this.compile(tpl, { header, content, errorText, css });

    return comp;
  }
}
