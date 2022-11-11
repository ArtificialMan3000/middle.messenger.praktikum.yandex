import { Component, TComponentProps } from '~src/view/Component';
import { MessageInputFile } from '../MessageInputFile';
import { MessageInputText } from '../MessageInputText';
import tpl from './MessageForm.hbs';
import * as css from './MessageForm.module.scss';

type TProps = TComponentProps;

export class MessageForm extends Component {
  constructor(props: TProps) {
    super(props, 'form');
  }

  render() {
    // Not button here. Send form by pressing 'enter'
    return this.compile(tpl, {
      css,
      InputFile: new MessageInputFile({ className: css.inputFile }),
      InputText: new MessageInputText({ className: css.inputText }),
    });
  }
}
