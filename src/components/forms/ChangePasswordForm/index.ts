import {
  withChangePasswordError,
  withChangePasswordLoader,
} from '~/src/controller/changePassword';
import { ChangePasswordForm } from './ChangePasswordForm';

const ConnectedChangePasswordForm = withChangePasswordLoader(
  withChangePasswordError(ChangePasswordForm)
);

export { ConnectedChangePasswordForm as ChangePasswordForm };
