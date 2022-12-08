import { withSignUpError, withSignUpLoader } from '~/src/controller';
import { RegForm } from './RegForm';

const ConnectedRegForm = withSignUpLoader(withSignUpError(RegForm));

export { ConnectedRegForm as RegForm };
