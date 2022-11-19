import { Component } from '~src/view/Component';
import { ChatHeader } from '../ChatHeader';
import { ChatMain } from '../ChatMain';
import tpl from './ChatWindow.hbs';
import * as css from './ChatWindow.module.scss';

export class ChatWindow extends Component<TProps> {
  render() {
    return this.compile(tpl, {
      css,
      Header: new ChatHeader({ className: css.header }),
      Main: new ChatMain({ className: css.main }),
    });
  }
}
