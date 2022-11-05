import tpl from './ChatsPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '~src/view/Component';

type TProps = TComponentProps;

export class ChatsPage extends Component {
  constructor(props: TProps) {
    const className = extendClassName(
      `${sharedCss['site-wrapper']}`,
      props.className
    );
    super('div', { ...props, className });
  }

  render() {
    return tpl({ css: sharedCss });
  }
};
