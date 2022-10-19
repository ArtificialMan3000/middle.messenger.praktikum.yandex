import template from './RegPage.hbs';

const formIds = {
  nameId: 'name',
  lastnameId: 'lastname',
  loginId: 'login',
  emailId: 'email',
  phoneId: 'phone',
  passwordId: 'password',
};

export const RegPage = (props) => template({ ...props, formIds });
