import { HomeOutlined, MergeCellsOutlined, TableOutlined, UserOutlined, ShopOutlined, SettingOutlined, PayCircleOutlined } from '@ant-design/icons';
import Dashboard from './Dashboard';
import CashFlow from './CashFlow';
import Orders from './OrdersToday';
import { randomPaths } from '../utils/Tool';

export interface IRoute {
  name: string
  path: string
  component: any,
  icon?: any,
  children?: Array<IRoute>
}

export function getRouteConfig(): Array<IRoute> {
  return [
  {
    // path: '/partners/home',
    path: '/partners/' + randomPaths[0],
    name: 'Home',
    component: Dashboard,
    icon: HomeOutlined,
  },
  {
    path: '/partners/' + randomPaths[1],
    name: 'Orders',
    icon: TableOutlined,
    component: null,
    children: [
      {
        path: '/' +  + randomPaths[2],
        name: 'Total Orders',
        component: Orders,
      },
      {
        path: '/today',
        name: 'Today Orders',
        component: Orders,
      },
    ],
  },
  {
    path: '/partners/' +  + randomPaths[3],
    name: 'CashFlow',
    icon: ShopOutlined,
    component: null,
    children: [
      {
        path: '/' + randomPaths[4],
        name: 'Total CashFlow',
        component: CashFlow,
      },
      {
        path: '/' + randomPaths[0],
        name: 'TodayCashFlow',
        component: CashFlow,
      },
    ],
  },
];
}
