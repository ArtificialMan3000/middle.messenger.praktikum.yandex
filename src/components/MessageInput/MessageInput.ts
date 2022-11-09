import { getComponentAsHTML } from '~/src/view/Component';
import { Component } from '~src/view/Component';
import { MessageInputFile } from '../MessageInputFile';
import { MessageInputText } from '../MessageInputText';
import tpl from './MessageInput.hbs';
import * as css from './MessageInput.module.scss';

export class MessageInput extends Component {
  render() {
    return tpl({
      css,
      InputFile: getComponentAsHTML(
        new MessageInputFile({ className: css.inputFile })
      ),
      InputText: getComponentAsHTML(
        new MessageInputText({ className: css.inputText })
      ),
    });
  }
}
