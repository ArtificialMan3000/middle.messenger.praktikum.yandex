import { getComponentAsHTML } from '~/src/view/Component';
import { Component } from '~src/view/Component';
import { ChatHeader } from '../ChatHeader';
import { ChatMain } from '../ChatMain';
import tpl from './ChatWindow.hbs';
import * as css from './ChatWindow.module.scss';

export class ChatWindow extends Component {
  render() {
    return tpl({
      css,
      Header: getComponentAsHTML(new ChatHeader({ className: css.header })),
      Main: getComponentAsHTML(new ChatMain({ className: css.main })),
    });
  }
}
