import { observer } from 'mobx-react';

import AppRouter from './model/AppRouter';

interface Props {
  router: AppRouter,
  children?: any
}

function Root({ router }: Props) {
  return router.page
}

// wrap in observable to allow page changes!
export default observer(Root);
