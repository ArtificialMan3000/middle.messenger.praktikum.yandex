import tpl from './Window.hbs';
import * as css from './Window.module.scss';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '~src/view/Component';

export class Window extends Component {
  constructor(props: TComponentProps) {
    const className = extendClassName(css.window, props.className);
    super('div', { ...props, className });
  }

  render() {
    const { header, content, errorText } = this.props;
    return tpl({ header, content, errorText, css });
  }
}


// export const Window: Component = ({ header, children }) => {
//   return tpl({ header, children, css });
// };
