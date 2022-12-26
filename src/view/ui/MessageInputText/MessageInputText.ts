import { Component } from '~/src/view/Component';
import tpl from './MessageInputText.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './MessageInputText.module.scss';
import { combineCssModules } from '~/src/view/View';

combineCssModules(css, sharedCss);

type TProps = {
  onFocus?: EventListener;
  onBlur?: EventListener;
  validationText?: string;
};

export class MessageInputText extends Component<TProps> {
  _addEvents() {
    const { onFocus, onBlur } = this.props;

    const input = this.element.querySelector('input');

    if (input) {
      if (onFocus) {
        input.addEventListener('focus', onFocus);
      }
      if (onBlur) {
        input.addEventListener('blur', onBlur);
      }
    }

    super._addEvents();
  }

  render() {
    const { validationText } = this.props;
    return this.compile(tpl, {
      validationText,
      css,
    });
  }
}
