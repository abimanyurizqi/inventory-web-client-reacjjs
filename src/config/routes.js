import { TransactionsPage , TransactionPage} from '../pages/transactions';
import { StocksPage, StockPage } from '../pages/stocks';
import { ItemsPage, ItemPage } from '../pages/items';
import { UnitsPage, UnitPage } from '../pages/units';
import { ErrorPage } from '../pages/error';


const routes = [
  {
    path: '/transactions/add',
    component: TransactionPage,
  },
  {
    path: '/transactions/:id',
    component: TransactionPage,
  },
  {
    path: '/',
    component: TransactionsPage,
    exact: true
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
    path: '/stocks/add',
    component: StockPage
  },
  {
    path: '/stocks/:id',
    component: StockPage
  },
  {
    path: '/stocks',
    component: StocksPage
  },
  {
    path: '/units/add',
    component: UnitPage
  },
  {
    path: '/units/:id',
    component: UnitPage
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

