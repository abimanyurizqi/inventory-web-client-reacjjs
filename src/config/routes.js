import { TransactionsPage } from '../pages/transactions';
import { StocksPage } from '../pages/stocks';
import { ItemsPage, ItemPage } from '../pages/items';
import { UnitsPage } from '../pages/units';
import { ErrorPage } from '../pages/error';


const routes = [
  {
    path: '/',
    component: TransactionsPage,
    exact: true
  },
  {
    path: '/transactions',
    component: TransactionsPage,
  },
  {
    path: '/items/add',
    component: ItemPage
  },
  {
    path: '/items/:id',
    component: ItemPage
  },
  {
    path: '/items',
    component: ItemsPage
  },
  {
    path: '/stocks',
    component: StocksPage
  },
  {
    path: '/units',
    component: UnitsPage
  },
  {
    path: '*',
    component: ErrorPage,
    props: {
      code: 404
    }
  }
];

export default routes;

