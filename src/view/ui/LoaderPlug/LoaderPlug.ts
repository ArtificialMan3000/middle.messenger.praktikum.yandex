import tpl from './LoaderPlug.hbs';
import * as css from './LoaderPlug.module.scss';
import { Component } from '~/src/view/Component';

export class LoaderPlug extends Component {
  render() {
    return this.compile(tpl, { css, ...this.props });
  }
}
