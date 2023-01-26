import { Component } from '~/src/view/Component';
import tpl from './ChatHeader.hbs';
import * as css from './ChatHeader.module.scss';

type TProps = {
  name: string;
};

export class ChatHeader extends Component<TProps> {
  render() {
    return this.compile(tpl, {
      css,
      name: this.props.name,
    });
  }
}
