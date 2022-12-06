import { constructRouter, Router } from '~/src/controller';
import { TSignUpModel, UserAuthAPI } from '~/src/api/userAuthApi';
import { store } from '~/src/store';
import { connect } from '../../store/connect';
import { Component, TComponentProps } from '../../view/Component';
import { validateForm } from '../fieldValidation';
import { markInvalid, markValid } from '~/src/view/View';

// TODO Сделать коннектор здесь (в контролере)
export class UserAuthController {
  UserAuthAPI: UserAuthAPI;

  SIGN_UP_FIELDS: string[];

  router: Router;

  constructor() {
    this.UserAuthAPI = new UserAuthAPI();
    this.SIGN_UP_FIELDS = [
      'first_name',
      'second_name',
      'login',
      'email',
      'newPassword',
      'phone',
    ];
    this.router = constructRouter();
  }

  prepareSignUpData(formData: FormData) {
    const data: TSignUpModel = {
      first_name: formData.get('first_name') as string,
      second_name: formData.get('second_name') as string,
      login: formData.get('login') as string,
      email: formData.get('email') as string,
      password: formData.get('newPassword') as string,
      phone: formData.get('phone') as string,
    };

    return data;
  }

  signUp(formData: FormData) {
    const requestData = this.prepareSignUpData(formData);
    store.setState('user.signUp.query.status', 'loading');

    this.UserAuthAPI.signUp(requestData).then((result) => {
      if (result.status === 200) {
        const responseData = JSON.parse(result.response);
        store.setState('user.signUp.query.status', 'success');
        this.router.go(`/chats/${responseData.id}`);
      } else {
        store.setState('user.signUp.query.status', 'failure');
      }
    });
  }

  onSignUpFormSubmit = (evt: Event) => {
    evt.preventDefault();

    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    const { invalids, valids } = validateForm(formData, this.SIGN_UP_FIELDS);

    if (invalids.length > 0) {
      invalids.forEach((invalidField) => {
        const invalidInput = form.querySelector<HTMLInputElement>(
          `[name=${invalidField}]`
        );
        if (invalidInput) {
          markInvalid(invalidInput);
        }
      });
    }

    if (valids.length > 0) {
      valids.forEach((invalidField) => {
        const validInput = form.querySelector<HTMLInputElement>(
          `[name=${invalidField}]`
        );
        if (validInput) {
          markValid(validInput);
        }
      });
    }

    if (invalids.length === 0) {
      this.signUp(formData);
    }

  };
}
