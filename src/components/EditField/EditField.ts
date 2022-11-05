import tpl from './EditField.hbs';
import * as css from './EditField.module.scss';
import { Component, TComponentProps } from '~src/view/Component';

type TProps = TComponentProps;

export class EditField extends Component {
  constructor(props: TProps) {
    super('div', props);
  }

  render() {
    const { className, type, id, name, label, value } = this.props;
    return tpl({ className, type, id, name, label, value, css });
  }
};
