import { Component } from '~src/view/Component';
import tpl from './Message.hbs';
import * as css from './Message.module.scss';

export class Message extends Component<TProps> {
  render() {
    const { type, content } = this.props;
    let classType: string;
    if (type === 'in') {
      classType = css.in;
    } else {
      classType = css.out;
    }

    return this.compile(tpl, {
      css: { ...css, type: classType },
      type,
      content,
    });
  }
}
