import { store } from '~/src/store';
import { validateForm } from '../fieldValidation';
import { markInvalid, markValid } from '~/src/view/View';
import { TChangePasswordRequest, UserAPI } from '~/src/api/userApi';

export class ChangePasswordController {
  UserAPI: UserAPI;

  FORM_FIELDS: string[];

  constructor() {
    this.UserAPI = new UserAPI();
    this.FORM_FIELDS = ['oldPassword', 'newPassword'];
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
    store.setState('user.changePassword.query.error', null);
    store.setState('user.changePassword.message', null);

    return this.UserAPI.changePassword(requestData)
      .then((result) => {
        store.setState('user.changePassword.query.isLoading', false);
        if (result.status === 200) {
          store.setState('user.changePassword.query.error', null);
          store.setState(
            'user.changePassword.message',
            'Пароль успешно изменён'
          );
        } else {
          const errorData = JSON.parse(result.response);
          store.setState(
            'user.changePassword.query.error',
            `${result.status} ${errorData.reason}`
          );
        }
      })
      .catch((err) => {
        if (err.message) {
          store.setState('user.changePassword.query.error', err.message);
        } else {
          store.setState('user.changePassword.query.error', 'Запрос прерван');
        }
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
      this.changePassword(formData).then(() => {
        form.reset();
      });
    }
  };
}
