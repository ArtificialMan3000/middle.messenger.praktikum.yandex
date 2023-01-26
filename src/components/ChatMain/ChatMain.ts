import { Component } from '~/src/view/Component';
import { outputForm } from '~/src/model/features/outputForm';
import { Message } from '../Message';
import tpl from './ChatMain.hbs';
import css from './ChatMain.module.scss';
import { MessageForm } from '~/src/components/forms/MessageForm';
import { messagesController, TChatMessage } from '~/src/controller/messages';

type TChatMessageWithDirection = TChatMessage & {
  direction: 'in' | 'out';
};

type TProps = {
  chatId?: number;
  messagesData?: TChatMessageWithDirection[];
};

export class ChatMain extends Component<TProps> {
  render() {
    const { messagesData = [], chatId } = this.props;

    const messages = messagesData.map((messageData) => {
      return new Message(
        {
          className: css.message,
          content: messageData.content,
          direction: messageData.direction,
        },
        'li'
      );
    });

    return this.compile(tpl, {
      css,
      messages,
      MessageForm: new MessageForm({
        className: css.input,
        events: {
          submit: [
            (evt: Event) => {
              evt.preventDefault();
              if (evt.target) {
                outputForm(evt.target as HTMLFormElement);
              }
            },
            (evt: Event) =>
              messagesController.onMessagesFormSubmit(evt, chatId),
          ],
        },
      }),
    });
  }
}
