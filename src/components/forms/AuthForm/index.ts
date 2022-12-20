import {
  withChangePasswordError,
  withChangePasswordLoader,
} from '~/src/controller';
import { AuthForm } from './AuthForm';

const ConnectedAuthForm = withChangePasswordLoader(
  withChangePasswordError(AuthForm)
);

export { ConnectedAuthForm as AuthForm };
