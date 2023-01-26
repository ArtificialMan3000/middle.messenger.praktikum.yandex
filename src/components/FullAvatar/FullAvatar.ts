import { ProfileController } from '~/src/controller/profile';
import tpl from './FullAvatar.hbs';
import * as css from './FullAvatar.module.scss';
import { Component, TComponentProps } from '~/src/view/Component';
import { makeClassNames } from '~/src/view/View';
import { TUserData } from '~/src/controller';
import { BaseAPI } from '~/src/utils/HTTPTransport';

type TProps = {
  userData?: TUserData | null;
  width?: number;
  height?: number;
};

const profileController = new ProfileController();

export class FullAvatar extends Component<TProps> {
  constructor(props: TComponentProps<TProps>) {
    const className = makeClassNames(css.avatar, props.className);
    super({ ...props, className }, 'div');
  }

  _addEvents() {
    const fileInput =
      this.element.querySelector<HTMLInputElement>('input[type=file]');

    if (fileInput) {
      fileInput.addEventListener('change', function () {
        const avatar = this.files?.[0];

        if (avatar) {
          const formData = new FormData();

          formData.set('avatar', avatar);

          profileController.changeAvatar(formData);
        }
      });
    }

    super._addEvents();
  }

  render() {
    const { userData, width = 300, height = 300 } = this.props;

    return this.compile(tpl, {
      imageSrc: `${BaseAPI.BASE_URL}/resources/${userData?.avatar}`,
      name: userData?.display_name,
      width,
      height,
      css,
    });
  }
}
