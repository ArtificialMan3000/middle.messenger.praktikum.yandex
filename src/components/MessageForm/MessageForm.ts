import { validationRules } from '~/src/model/features/fieldValidation';
import { Component, TComponentProps } from '~/src/view/Component';
import { MessageInputFile } from '../MessageInputFile';
import { MessageInputText } from '../MessageInputText';
import tpl from './MessageForm.hbs';
import * as css from './MessageForm.module.scss';

type TProps = TComponentProps;

export class MessageForm extends Component<TProps> {
  constructor(props: TProps) {
    super(props, 'form');
  }

  _addEvents() {
    const { events = {} } = this.props;
    const {
      inputFocus: inputFocusListeners = [],
      inputBlur: inputBlurListeners = [],
    } = events;

    this.element.querySelectorAll('input').forEach((input) => {
      inputFocusListeners.forEach((inputFocusEvent) => {
        input.addEventListener('focus', inputFocusEvent);
      });
      inputBlurListeners.forEach((inputBlurEvent) => {
        input.addEventListener('blur', inputBlurEvent);
      });
    });

    super._addEvents();
  }

  render() {
    // Not button here. Send form by pressing 'enter'
    return this.compile(tpl, {
      css,
      InputFile: new MessageInputFile({ className: css.inputFile }),
      InputText: new MessageInputText({
        className: css.inputText,
        validationText: validationRules.message.description,
      }),
    });
  }
}
