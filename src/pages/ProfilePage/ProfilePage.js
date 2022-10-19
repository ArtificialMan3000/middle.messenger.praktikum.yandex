import template from './ProfilePage.hbs';

const formIds = {
  nameId: 'name',
  lastnameId: 'lastname',
  loginId: 'login',
  emailId: 'email',
  phoneId: 'phone',
  chatnameId: 'chatname',
};

export const ProfilePage = (props) => template({ ...props, formIds });
