import { Page as PageBase } from '~/src/view/ui/Page';
import { withAppLoader } from '../hocs';

export const Page = withAppLoader(PageBase);
