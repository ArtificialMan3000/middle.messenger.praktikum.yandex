const mock = {
  first_name: 'Alexander',
  second_name: 'Alexandroff',
  login: 'Alex',
  email: 'alex@yandex.ru',
  newPassword: 'Qwerty123',
  phone: '1234567890',
};

// @ts-ignore
window.testRegFormWithError = function () {
  const form = document.querySelector('form.reg-form');

  if (form) {
    const firstNameField = (form.querySelector(
      'input[name=first_name]'
    ) as HTMLFormElement) || {
      value: '',
    };
    const secondNameField = (form.querySelector(
      'input[name=second_name]'
    ) as HTMLFormElement) || {
      value: '',
    };
    const loginField = (form.querySelector(
      'input[name=login]'
    ) as HTMLFormElement) || { value: '' };
    const emailField = (form.querySelector(
      'input[name=email]'
    ) as HTMLFormElement) || { value: '' };
    const newPasswordField = (form.querySelector(
      'input[name=newPassword]'
    ) as HTMLFormElement) || {
      value: '',
    };
    const phoneField = (form.querySelector(
      'input[name=phone]'
    ) as HTMLFormElement) || { value: '' };

    firstNameField.value = mock.first_name;
    secondNameField.value = mock.second_name;
    loginField.value = `${mock.login}`;
    emailField.value = `${mock.email}`;
    newPasswordField.value = mock.newPassword;
    phoneField.value = mock.phone;

    form.dispatchEvent(new Event('submit'));
  }
};
