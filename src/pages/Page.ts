import { Page as PageBase } from '~/src/view/ui/Page';
import { withAppLoader } from '../controller/hocs';

export const Page = withAppLoader(PageBase);
