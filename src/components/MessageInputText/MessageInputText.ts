import { Component } from '~src/view/Component';
import tpl from './MessageInputText.hbs';
import * as css from './MessageInputText.module.scss';

export class MessageInputText extends Component {
  render() {
    return this.compile(tpl, {
      css,
    });
  }
}
