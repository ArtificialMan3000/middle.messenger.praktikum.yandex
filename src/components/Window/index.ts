import { Window } from './Window';
import { withError } from '~/src/controller/auth/hocs/withError';

const ConnectedWindow = withError(Window);

export { ConnectedWindow as Window };
