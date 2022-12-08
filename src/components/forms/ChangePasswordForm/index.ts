import { withError } from '~/src/controller/auth/hocs/withError';
import { withLoader } from '~/src/controller/auth/hocs/withLoader';
import { ChangePasswordForm } from './ChangePasswordForm';

const ConnectedChangePasswordForm = withLoader(withError(ChangePasswordForm));

export { ConnectedChangePasswordForm as ChangePasswordForm };
