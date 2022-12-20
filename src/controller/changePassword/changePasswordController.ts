import { constructRouter, Router } from '~/src/controller';
import { store } from '~/src/store';
import { validateForm } from '../fieldValidation';
import { markInvalid, markValid } from '~/src/view/View';
import { TChangePasswordRequest, UserAPI } from '~/src/api/userApi';

export class ChangePasswordController {
  UserAPI: UserAPI;

  FORM_FIELDS: string[];

  router: Router;

  constructor() {
    this.UserAPI = new UserAPI();
    this.FORM_FIELDS = ['oldPassword', 'newPassword'];
    this.router = constructRouter();
  }

  prepareData(formData: FormData) {
    const data: TChangePasswordRequest = {
      oldPassword: formData.get('oldPassword') as string,
      newPassword: formData.get('newPassword') as string,
    };

    return data;
  }

  changePassword(formData: FormData) {
    const requestData = this.prepareData(formData);
    store.setState('user.changePassword.query.isLoading', true);

    this.UserAPI.changePassword(requestData)
      .then((result) => {
        store.setState('user.changePassword.query.isLoading', false);
        const responseData = JSON.parse(result.response);
        if (result.status === 200) {
          store.setState('user.changePassword.query.error', null);
          this.router.go(`/profile`);
        } else {
          store.setState(
            'user.changePassword.query.error',
            responseData.reason
          );
        }
      })
      .catch(() => {
        store.setState('user.changePassword.query.error', 'Запрос прерван');
      });
  }

  onChangePasswordFormSubmit = (evt: Event) => {
    evt.preventDefault();

    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    const { invalids, valids } = validateForm(formData, this.FORM_FIELDS);

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
      this.changePassword(formData);
    }
  };
}
