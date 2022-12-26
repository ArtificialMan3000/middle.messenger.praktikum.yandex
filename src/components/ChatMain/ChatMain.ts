import { Component } from '~/src/view/Component';
import { setValidityStatus } from '~/src/controller/fieldValidation';
import { outputForm } from '~/src/model/features/outputForm';
import { Message } from '../Message';
import tpl from './ChatMain.hbs';
import * as css from './ChatMain.module.scss';
import { MessageForm } from '~/src/view/ui/MessageForm';

export class ChatMain extends Component {
  render() {
    return this.compile(tpl, {
      css,
      messages: [
        new Message(
          {
            className: css.message,
            type: 'in',
            content: 'Привет! Как дела?',
          },
          'li'
        ),
        new Message(
          {
            className: css.message,
            type: 'out',
            content: 'Привет! Всё хорошо',
          },
          'li'
        ),
      ],
      MessageForm: new MessageForm({
        className: css.input,
        onInputTextFocus: (evt) => {
          setValidityStatus(evt.target as HTMLInputElement);
        },
        onInputTextBlur: (evt) => {
          setValidityStatus(evt.target as HTMLInputElement);
        },
        events: {
          submit: [
            (evt: Event) => {
              evt.preventDefault();
              if (evt.target) {
                outputForm(evt.target as HTMLFormElement);
              }
            },
            (evt: Event) => {
              evt.preventDefault();
              const form = evt.target as HTMLFormElement;
              const inputs = form.querySelectorAll('input');
              inputs.forEach((input) => {
                setValidityStatus(input);
              });
            },
          ],
        },
      }),
    });
  }
}
