import { Component } from '~src/view/Component';
import tpl from './MessageInputFile.hbs';
import * as css from './MessageInputFile.module.scss';

export class MessageInputFile extends Component {
  render() {
    return tpl({
      css,
    });
  }
}
