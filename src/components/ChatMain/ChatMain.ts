import { Component } from '~/src/view/Component';
import { setValidityStatus } from '~/src/controller/fieldValidation';
import { outputForm } from '~/src/model/features/outputForm';
import { Message } from '../Message';
import { MessageForm } from '../forms/MessageForm';
import tpl from './ChatMain.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './ChatMain.module.scss';
import { combineCssModules } from '~/src/view/View';

combineCssModules(css, sharedCss);

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
      Input: new MessageForm({
        className: css.input,
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
                setValidityStatus(input, css.notValid);
              });
            },
          ],
          inputFocus: [
            (evt) => {
              setValidityStatus(evt.target as HTMLInputElement, css.notValid);
            },
          ],
          inputBlur: [
            (evt) => {
              setValidityStatus(evt.target as HTMLInputElement, css.notValid);
            },
          ],
        },
      }),
    });
  }
}
