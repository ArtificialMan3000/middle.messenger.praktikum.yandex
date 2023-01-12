import { TSignInRequest, AuthAPI } from '~/src/api/authApi';
import { store } from '~/src/store';
import { validateForm } from '../fieldValidation';
import { markInvalid, markValid } from '~/src/view/View';
import RouterManagement from '../RouterManagement';

export class SignInController {
  AuthAPI: AuthAPI;

  SIGN_IN_FIELDS: string[];

  constructor() {
    this.AuthAPI = new AuthAPI();
    this.SIGN_IN_FIELDS = ['login', 'password'];
  }

  prepareSignInData(formData: FormData) {
    const data: TSignInRequest = {
      login: formData.get('login') as string,
      password: formData.get('password') as string,
    };

    return data;
  }

  signIn(formData: FormData) {
    const requestData = this.prepareSignInData(formData);
    store.setState('user.signIn.query.isLoading', true);
    store.setState('user.signIn.query.error', null);

    this.AuthAPI.signIn(requestData)
      .then((result) => {
        store.setState('user.signIn.query.isLoading', false);

        if (result.status === 200) {
          store.setState('user.signIn.query.error', null);
          RouterManagement.go('/chats');
        } else {
          const responseData = JSON.parse(result.response);
          store.setState('user.signIn.query.error', responseData.reason);
        }
      })
      .catch((err) => {
        if (err.message) {
          store.setState('user.signIn.query.error', err.message);
        } else {
          store.setState('user.signIn.query.error', 'Запрос прерван');
        }
      });
  }

  onSignInFormSubmit = (evt: Event) => {
    evt.preventDefault();

    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    const { invalids, valids } = validateForm(formData, this.SIGN_IN_FIELDS);

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
      this.signIn(formData);
    }
  };
}
