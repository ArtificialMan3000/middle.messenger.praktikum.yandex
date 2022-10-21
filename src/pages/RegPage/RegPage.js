import tpl from './RegPage.hbs';
import * as css from './RegPage.module.scss';
import { RegForm } from '~/src/components/RegForm';
import { Window } from '~/src/components/Window';

export const RegPage = (props) => {
  return tpl({ ...props, css, Window: Window({ children: RegForm }) });
};
