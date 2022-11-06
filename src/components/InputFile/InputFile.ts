import { Component } from '~src/view/Component';
import tpl from './InputFile.hbs';
import * as css from './InputFile.module.scss';

export class InputFile extends Component {
  render() {
    return tpl({
      css,
    });
  }
}
