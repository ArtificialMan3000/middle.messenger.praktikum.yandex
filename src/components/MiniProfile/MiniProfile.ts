import tpl from './MiniProfile.hbs';
import * as css from './MiniProfile.module.scss';
import { Component } from '~/src/view/Component';
import { TUserData } from '~/src/controller';

type TProps = {
  userData?: TUserData;
};

export class MiniProfile extends Component<TProps> {
  render() {
    const { first_name: firstName, second_name: secondName } =
      this.props.userData ?? {};

    return this.compile(tpl, { css, name: `${firstName} ${secondName}` });
  }
}
