import tpl from './RegPage.hbs';
import * as css from './RegPage.module.scss';
import { RegForm } from '~/src/components/forms/RegForm';
import { Window } from '~/src/components/Window';
import { Component, TComponentProps } from '~/src/view/Component';
import { outputForm } from '~/src/model/features/outputForm';
import { SignUpController } from '~/src/controller/';
import { setValidityStatus } from '~/src/controller/fieldValidation';
import { Page } from '~/src/view/ui/Page';

const signUpController = new SignUpController();
export class RegPage extends Component {
  render() {
    return this.compile(tpl, {
      Page: new Page({
        css,
        children: new Window({
          header: 'Регистрация',
          content: new RegForm({
            className: 'reg-form',
            events: {
              submit: [
                (evt: Event) => {
                  evt.preventDefault();
                  if (evt.target) {
                    outputForm(evt.target as HTMLFormElement);
                  }
                },
                signUpController.onSignUpFormSubmit,
              ],
              inputFocus: [
                (evt: Event) => {
                  setValidityStatus(evt.target as HTMLInputElement);
                },
              ],
              inputBlur: [
                (evt: Event) => {
                  setValidityStatus(evt.target as HTMLInputElement);
                },
              ],
            },
          }),
        }),
      }),
    });
  }
}
