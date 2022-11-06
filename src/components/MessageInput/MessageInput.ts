import { getComponentAsHTML } from '~/src/view/Component';
import { Component } from '~src/view/Component';
import { InputFile } from '../InputFile';
import { InputText } from '../InputText';
import tpl from './MessageInput.hbs';
import * as css from './MessageInput.module.scss';

export class MessageInput extends Component {
  render() {
    return tpl({
      css,
      InputFile: getComponentAsHTML(
        new InputFile({ className: css.inputFile })
      ),
      InputText: getComponentAsHTML(
        new InputText({ className: css.inputText })
      ),
    });
  }
}
