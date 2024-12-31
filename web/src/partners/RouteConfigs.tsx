import { HomeOutlined, MergeCellsOutlined, TableOutlined, UserOutlined, ShopOutlined, SettingOutlined, PayCircleOutlined } from '@ant-design/icons';
import Dashboard from './Dashboard';
import CashFlow from './CashFlow';
import Orders from './OrdersToday';
import { getRandomPath } from '../utils/Tool';

export interface IRoute {
  name: string
  path: string
  component: any,
  icon?: any,
  children?: Array<IRoute>
}

enum MODEL_PATH {
  HOME, ORDERS, CASHFLOW
}

export function getRouteConfig(): Array<IRoute> {
  return [
  {
    // path: '/partners/home',
    path: '/partners/' + getRandomPath(MODEL_PATH.HOME),
    name: 'Home',
    component: Dashboard,
    icon: HomeOutlined,
  },
  {
    path: '/partners/' + getRandomPath(MODEL_PATH.ORDERS),
    name: 'Orders',
    icon: TableOutlined,
    component: null,
    children: [
      {
        path: '/' + getRandomPath(0),
        name: 'Total Orders',
        component: Orders,
      },
      {
        path: '/' + getRandomPath(1),
        name: 'Today Orders',
        component: Orders,
      },
    ],
  },
  {
    path: '/partners/'  + getRandomPath(MODEL_PATH.CASHFLOW),
    name: 'CashFlow',
    icon: ShopOutlined,
    component: null,
    children: [
      {
        path: '/' + getRandomPath(0),
        name: 'Total CashFlow',
        component: CashFlow,
      },
      {
        path: '/' + getRandomPath(1),
        name: 'TodayCashFlow',
        component: CashFlow,
      },
    ],
  },
];
}

