import { MessageInputFile } from '~/src/view/ui/MessageInputFile';
import { MessageInputText } from '~/src/view/ui/MessageInputText';
import { validationRules } from '~/src/controller/fieldValidation';
import { Component, TComponentProps } from '~/src/view/Component';
import tpl from './MessageForm.hbs';
import * as css from './MessageForm.module.scss';

type TProps = {
  message?: string;
  errorText?: string;
  onInputTextFocus?: EventListener;
  onInputTextBlur?: EventListener;
};

export class MessageForm extends Component<TProps> {
  constructor(props: TComponentProps<TProps>) {
    super(props, 'form');
  }

  render() {
    const { onInputTextFocus, onInputTextBlur, message, errorText } =
      this.props;

    // Not button here. Send form by pressing 'enter'
    return this.compile(tpl, {
      css,
      message,
      errorText,
      InputFile: new MessageInputFile({ className: css.inputFile }),
      InputText: new MessageInputText({
        className: css.inputText,
        onFocus: onInputTextFocus,
        onBlur: onInputTextBlur,
        validationText: validationRules.message.description,
      }),
    });
  }
}
