import { Component } from '~src/view/Component';
import tpl from './InputText.hbs';
import * as css from './InputText.module.scss';

export class InputText extends Component {
  render() {
    return tpl({
      css,
    });
  }
}
