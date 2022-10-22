import tpl from './RegPage.hbs';
import * as sharedCss from '~/src/scss/shared.module.scss';
import * as css from './RegPage.module.scss';
import { RegForm } from '~/src/components/RegForm';
import { Window } from '~/src/components/Window';

Object.assign(css, sharedCss);

export const RegPage = (props) => {
  return tpl({
    ...props,
    Window: Window({ header: 'Регистрация', children: RegForm }),
    css,
  });
};
