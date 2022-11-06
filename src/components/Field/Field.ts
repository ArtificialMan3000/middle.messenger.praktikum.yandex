import tpl from './Field.hbs';
import * as css from './Field.module.scss';
import { TComponentProps, Component } from '~/src/view/Component';

type TProps = TComponentProps;

export class Field extends Component {
  constructor(props: TProps) {
    super(props, 'div');
  }

  render() {
    const { className, type, id, name, label, placeholder } = this.props;
    return tpl({ className, type, id, name, label, placeholder, css });
  }
}
