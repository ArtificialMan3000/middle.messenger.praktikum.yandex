import tpl from './E500Page.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './E500.module.scss';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '~src/view/Component';

Object.assign(css, sharedCss);

type TProps = TComponentProps;

export class E500Page extends Component {
  constructor(props: TProps) {
    const className = extendClassName(
      `${css['site-wrapper']} ${css['danger-bg']}`,
      props.className
    );
    super('div', { ...props, className });
  }

  render() {
    return tpl({ css });
  }
};
