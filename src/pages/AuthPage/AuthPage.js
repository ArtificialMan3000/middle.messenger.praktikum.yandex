import template from './AuthPage.hbs';

const formIds = {
  loginId: 'login',
  passwordId: 'password',
};

export const AuthPage = (props) => template({ ...props, formIds });
