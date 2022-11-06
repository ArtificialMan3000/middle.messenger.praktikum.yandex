import { Component, getComponentAsHTML } from '~/src/view/Component';
import { Message } from '../Message';
import { MessageInput } from '../MessageInput';
import tpl from './ChatMain.hbs';
import * as css from './ChatMain.module.scss';

export class ChatMain extends Component {
  render() {
    return tpl({
      css,
      messages: [
        getComponentAsHTML(
          new Message(
            {
              className: css.message,
              type: 'in',
              content: 'Привет! Как дела?',
            },
            'li'
          )
        ),
        getComponentAsHTML(
          new Message(
            {
              className: css.message,
              type: 'out',
              content: 'Привет! Всё хорошо',
            },
            'li'
          )
        ),
      ],
      Input: getComponentAsHTML(new MessageInput({ className: css.input })),
    });
  }
}
