import tpl from './E404Page.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './E404.module.scss';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '~src/view/Component';

Object.assign(css, sharedCss);

type TProps = TComponentProps;

export class E404Page extends Component {
  constructor(props: TProps) {
    const className = extendClassName(`${css.siteWrapper}`, props.className);
    super({ ...props, className }, 'div');
  }

  render() {
    return tpl({ css });
  }
};
