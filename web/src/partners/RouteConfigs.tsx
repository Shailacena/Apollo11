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
    component: Orders,
  },
  {
    path: '/CashFlow',
    name: 'CashFlow',
    icon: UserOutlined,
    component: CashFlow,
  },
];
