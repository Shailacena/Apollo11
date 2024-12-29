import { HomeOutlined, MergeCellsOutlined, TableOutlined, UserOutlined, ShopOutlined, SettingOutlined, PayCircleOutlined } from '@ant-design/icons';
import Dashboard from './Dashboard';
import CashFlow from './CashFlow';
import Orders from './OrdersToday';


export interface IRoute {
  name: string
  path: string
  component: any,
  icon?: any,
  children?: Array<IRoute>
}

export const RouteConfigs: Array<IRoute> = [
  {
    path: '/partners/home',
    name: 'Home',
    component: Dashboard,
    icon: HomeOutlined,
  },
  {
    path: '/partners/orders',
    name: 'Orders',
    icon: TableOutlined,
    component: null,
    children: [
      {
        path: '/total',
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
    path: '/partners/cashflow',
    name: 'CashFlow',
    icon: ShopOutlined,
    component: null,
    children: [
      {
        path: '/total',
        name: 'Total CashFlow',
        component: CashFlow,
      },
      {
        path: '/today',
        name: 'TodayCashFlow',
        component: CashFlow,
      },
    ],
  },
];
