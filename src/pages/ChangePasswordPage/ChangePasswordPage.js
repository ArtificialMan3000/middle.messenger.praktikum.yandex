import template from './ChangePasswordPage.hbs';

const formIds = {
  oldPasswordId: 'old-password',
  newPasswordId: 'new-pasword',
  repeatPasswordId: 'repeat-password',
};

export const ChangePasswordPage = (props) => template({ ...props, formIds });
