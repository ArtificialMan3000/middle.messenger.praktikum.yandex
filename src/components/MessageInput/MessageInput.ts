import { Component } from '~src/view/Component';
import { MessageInputFile } from '../MessageInputFile';
import { MessageInputText } from '../MessageInputText';
import tpl from './MessageInput.hbs';
import * as css from './MessageInput.module.scss';

export class MessageInput extends Component {
  render() {
    return this.compile(tpl, {
      css,
      InputFile: new MessageInputFile({ className: css.inputFile }),
      InputText: new MessageInputText({ className: css.inputText }),
    });
  }
}
