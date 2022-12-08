import { withSignInError, withSignInLoader } from '~/src/controller';
import { AuthForm } from './AuthForm';

const ConnectedAuthForm = withSignInLoader(withSignInError(AuthForm));

export { ConnectedAuthForm as AuthForm };
