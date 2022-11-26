import tpl from './E500Page.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './E500.module.scss';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '~/src/view/Component';
import { Link } from '~/src/components/Link';

Object.assign(css, sharedCss);

type TProps = TComponentProps;

export class E500Page extends Component<TProps> {
  constructor(props: TProps) {
    const className = extendClassName(
      `${css.siteWrapper} ${css.dangerBg}`,
      props.className
    );
    super({ ...props, className }, 'main');
  }

  render() {
    return this.compile(tpl, {
      css,
      ToChatLink: new Link({
        href: '/chats',
        text: 'Убежать',
        className: css.backlink,
      }),
    });
  }
};
