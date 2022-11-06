import { MiniAvatar } from '../MiniAvatar';
import { getComponentAsHTML } from '~/src/view/Component';
import { Component } from '~src/view/Component';
import tpl from './ChatHeader.hbs';
import * as css from './ChatHeader.module.scss';

export class ChatHeader extends Component {
  render() {
    return tpl({
      css,
      Avatar: getComponentAsHTML(
        new MiniAvatar({
          className: css.avatar,
          imageSrc: 'img/avatar.jpg',
          width: 50,
          height: 50,
        })
      ),
    });
  }
}
