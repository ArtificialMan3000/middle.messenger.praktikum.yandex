import { Component } from '~/src/view/Component';
import tpl from './Message.hbs';
import * as css from './Message.module.scss';

type TProps = {
  content: string;
  direction: 'in' | 'out';
};

export class Message extends Component<TProps> {
  render() {
    const { direction, content } = this.props;
    let classType: string;
    if (direction === 'in') {
      classType = css.in;
    } else {
      classType = css.out;
    }

    return this.compile(tpl, {
      css: { ...css, type: classType },
      content,
    });
  }
}
