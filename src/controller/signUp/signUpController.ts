import { TSignUpRequest, AuthAPI } from '~/src/api/authApi';
import { store } from '~/src/store';
import { validateForm } from '../fieldValidation';
import { markInvalid, markValid } from '~/src/view/View';
import RouterManagement from '../RouterManagement';

export class SignUpController {
  AuthAPI: AuthAPI;

  SIGN_UP_FIELDS: string[];

  constructor() {
    this.AuthAPI = new AuthAPI();
    this.SIGN_UP_FIELDS = [
      'first_name',
      'second_name',
      'login',
      'email',
      'newPassword',
      'phone',
    ];
  }

  prepareSignUpData(formData: FormData) {
    const data: TSignUpRequest = {
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
    store.setState('user.signUp.query.isLoading', true);
    store.setState('user.signUp.query.error', null);

    this.AuthAPI.signUp(requestData)
      .then((result) => {
        store.setState('user.signUp.query.isLoading', false);

        if (result.status === 200) {
          store.setState('user.signUp.query.error', null);
          RouterManagement.go(`/chats`);
        } else {
          const responseData = JSON.parse(result.response);
          store.setState(
            'user.signUp.query.error',
            `${result.status} ${responseData.reason}`
          );
        }
      })
      .catch((err) => {
        if (err.message) {
          store.setState('user.signUp.query.error', err.message);
        } else {
          store.setState('user.signUp.query.error', 'Запрос прерван');
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
