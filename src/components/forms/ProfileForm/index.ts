import { withProfileError } from '~/src/controller';
import { withProfileLoader } from '~/src/controller';
import { ProfileForm } from './ProfileForm';

const ConnectedProfileForm = withProfileLoader(withProfileError(ProfileForm));

export { ConnectedProfileForm as ProfileForm };
