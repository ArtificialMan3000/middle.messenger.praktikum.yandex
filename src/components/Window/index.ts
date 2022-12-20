import { Window } from './Window';
import { withError } from '~/src/controller/hocs/withError';

const ConnectedWindow = withError(Window);

export { ConnectedWindow as Window };
