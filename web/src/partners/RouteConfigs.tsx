import { HomeOutlined, MergeCellsOutlined, TableOutlined, UserOutlined, ShopOutlined, SettingOutlined, PayCircleOutlined } from '@ant-design/icons';
import Dashboard from './Dashboard';
import CashFlow from './CashFlow';
import Orders from './Orders';


export interface IRoute {
  name: string
  path: string
  component: any,
  icon?: any,
  children?: Array<IRoute>
}

export const RouteConfigs: Array<IRoute> = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
    icon: HomeOutlined,
  },
  {
    path: '/Orders',
    name: 'Orders',
    icon: TableOutlined,
    component: null,
    children: [
      {
        path: '/TotalOrders',
        name: 'Total Orders',
        component: Orders,
      },
      {
        path: '/TodayOrders',
        name: 'Today Orders',
        component: Orders,
      },
    ],
  },
  {
    path: '/CashFlow',
    name: 'CashFlow',
    icon: ShopOutlined,
    component: null,
    children: [
      {
        path: '/TotalCashFlow',
        name: 'Total CashFlow',
        component: CashFlow,
      },
      {
        path: '/TodayCashFlow',
        name: 'TodayCashFlow',
        component: CashFlow,
      },
    ],
  },
];
