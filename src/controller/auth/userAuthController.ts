import { TSignUpModel, UserAuthAPI } from '~/src/api/userAuthApi';
import { store } from '~/src/store';
import { connect } from '../../store/connect';
import { Component, TComponentProps } from '../../view/Component';
import { isFieldValid } from '../fieldValidation';

// TODO Сделать коннектор здесь (в контролере)
export class UserAuthController {
  UserAuthAPI: UserAuthAPI;

  SIGN_UP_FIELDS: string[];

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
  }

  validateSignUpData(formData: FormData) {
    return this.SIGN_UP_FIELDS.every((field) => {
      const fieldValue = formData.get(field);
      if (isFieldValid(field, fieldValue)) {
        return true;
      }
      return false;
    });
  }

  prepareSignUpData(formData: FormData) {
    if (!this.validateSignUpData(formData)) {
      throw new Error('Data for sign up is not valid');
    }

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
    const data = this.prepareSignUpData(formData);
    store.setState('user.signUp.query.status', 'loading');

    this.UserAuthAPI.signUp(data).then((result) => {
      if (result.status === 200) {
        store.setState('user.signUp.query.status', 'success');
      } else {
        store.setState('user.signUp.query.status', 'failure');
      }
    });
  }
}
