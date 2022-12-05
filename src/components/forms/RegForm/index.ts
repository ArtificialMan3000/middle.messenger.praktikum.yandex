import { withLoader } from '~/src/controller/auth/hocs/withLoader';
import { RegForm } from './RegForm';

const ConnectedRegForm = withLoader(RegForm);

export { ConnectedRegForm as RegForm };
