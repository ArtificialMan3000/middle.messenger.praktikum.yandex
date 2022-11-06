import tpl from './MiniAvatar.hbs';
import * as css from './MiniAvatar.module.scss';
import { Component } from '~src/view/Component';

export class MiniAvatar extends Component {
  render() {
    const { imageSrc, width = 30, height = 30 } = this.props;
    return tpl({ imageSrc, width, height, css });
  }
}
