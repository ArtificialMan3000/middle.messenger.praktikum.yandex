import { connect } from '~/src/store/connect';
import type { TState } from '~/src/store/types';
import { ProfilePage } from './ProfilePage';

function mapUserToProps(state: TState) {
  const loadingStatus = state.user?.profile?.query?.status;
  const props = {
    isLoaderDisplayed: true,
  };
  if (loadingStatus === 'loaded') {
    props.isLoaderDisplayed = false;
  }
  return props;
}

const ConnectedProfilePage = connect(mapUserToProps)(ProfilePage);
export { ConnectedProfilePage as ProfilePage };
