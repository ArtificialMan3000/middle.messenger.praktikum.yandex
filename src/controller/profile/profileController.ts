import { constructRouter, Router } from '~/src/controller';
import { store } from '~/src/store';
import { validateForm } from '../fieldValidation';
import { markInvalid, markValid } from '~/src/view/View';
import { TChangeProfileRequest, UserAPI } from '~/src/api/userApi';

export class ProfileController {
  UserAPI: UserAPI;

  FORM_FIELDS: string[];

  router: Router;

  constructor() {
    this.UserAPI = new UserAPI();
    this.FORM_FIELDS = [
      'first_name',
      'second_name',
      'display_name',
      'login',
      'email',
      'phone',
    ];
    this.router = constructRouter();
  }

  prepareData(formData: FormData) {
    const data: TChangeProfileRequest = {
      first_name: formData.get('first_name') as string,
      second_name: formData.get('second_name') as string,
      display_name: formData.get('display_name') as string,
      login: formData.get('login') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    return data;
  }

  changeProfile(formData: FormData) {
    const requestData = this.prepareData(formData);
    store.setState('user.profile.query.isLoading', true);

    this.UserAPI.changeProfile(requestData)
      .then((result) => {
        store.setState('user.profile.query.isLoading', false);
        const responseData = JSON.parse(result.response);
        if (result.status === 200) {
          store.setState('user.profile.query.error', null);
          this.router.go(`/profile`);
        } else {
          store.setState('user.profile.query.error', responseData.reason);
        }
      })
      .catch(() => {
        store.setState('user.profile.query.error', 'Запрос прерван');
      });
  }

  onProfileFormSubmit = (evt: Event) => {
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
      this.changeProfile(formData);
    }
  };
}
