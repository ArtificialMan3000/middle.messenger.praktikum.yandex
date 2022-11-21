import tpl from './ChatsPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './ChatsPage.module.scss';
import {
  Component,
  extendClassName,
  TComponentProps,
} from '~/src/view/Component';
import { combineCssModules } from '~/src/view/View';
import { ChatList } from '~/src/components/ChatList';
import { ChatWindow } from '~/src/components/ChatWindow';

combineCssModules(css, sharedCss);

type TProps = TComponentProps;

export class ChatsPage extends Component<TProps> {
  constructor(props: TProps) {
    const className = extendClassName(`${css.siteWrapper}`, props.className);
    super({ ...props, className }, 'main');
  }

  render() {
    return this.compile(tpl, {
      css,
      ChatList: new ChatList({ className: css.chats }),
      MainChat: new ChatWindow({ className: css.mainChat }),
    });
  }
}
