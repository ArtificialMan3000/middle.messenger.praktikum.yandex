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
  render() {
    const { validationText } = this.props;
    return this.compile(tpl, {
      validationText,
      css,
    });
  }
}
