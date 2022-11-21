import { Component } from '~/src/view/Component';
import tpl from './MessageInputText.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './MessageInputText.module.scss';
import { combineCssModules } from '~/src/view/View';

combineCssModules(css, sharedCss);

export class MessageInputText extends Component {
  render() {
    return this.compile(tpl, {
      ...this.props,
      css,
    });
  }
}
