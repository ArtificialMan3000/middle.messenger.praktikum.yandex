import { connect } from '~/src/store/connect';
import { AuthForm } from './AuthForm';

const ConnectedAuthForm = connect((state) => {
  const queryStatus = state.user?.query?.status || 'idle';
  if (queryStatus === 'success') {
    return { loader: false };
  }
  return { loader: true };
})(AuthForm);

export { ConnectedAuthForm as AuthForm };
