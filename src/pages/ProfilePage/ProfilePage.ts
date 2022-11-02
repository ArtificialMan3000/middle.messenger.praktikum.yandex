import tpl from './ProfilePage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './ProfilePage.module.scss';
import { Backlink } from '~/src/components/Backlink';
import { FullAvatar } from '~/src/components/FullAvatar';
import { ProfileForm } from '~/src/components/ProfileForm';
import { Window } from '~/src/components/Window';
import { Component } from '~/src/typings/types';

Object.assign(css, sharedCss);

export const ProfilePage: Component = (properties) => {
  return tpl({
    ...properties,
    css,
    Window: Window({ children: ProfileForm }),
    FullAvatar: FullAvatar({ imageSrc: 'img/avatar.jpg', name: 'Имя Фамилия' }),
    Backlink: Backlink({ href: 'chats.html', text: 'К чатам' }),
  });
};
