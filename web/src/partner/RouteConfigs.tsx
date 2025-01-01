import { HomeOutlined, MergeCellsOutlined, TableOutlined, UserOutlined, ShopOutlined, SettingOutlined, PayCircleOutlined } from '@ant-design/icons';
import Dashboard from './Dashboard';
import CashFlow from './CashFlow';
import { getRandomPath } from '../utils/Tool';
import Goods from './Goods';
import CashFlowDaily from './CashFlowDaily';

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

const routeconfigs: IRoute[] = []

export function getRouteConfig(): Array<IRoute> {
  if (routeconfigs.length != 0) {
    return routeconfigs;
  } else {
    let routs = [{
      // path: '/partner/home',
      path: '/partner/' + getRandomPath(MODEL_PATH.HOME),
      name: '首页',
      component: Dashboard,
      icon: HomeOutlined,
    },
    {
      path: '/partner/' + getRandomPath(MODEL_PATH.ORDERS),
      name: '商品管理',
      icon: TableOutlined,
      component: null,
      children: [
        {
          path: '/' + getRandomPath(0),
          name: '商品列表',
          component: Goods,
        },
      ],
    },
    {
      path: '/partner/' + getRandomPath(MODEL_PATH.CASHFLOW),
      name: '流水记录',
      icon: ShopOutlined,
      component: null,
      children: [
        {
          path: '/' + getRandomPath(0),
          name: '账户流水',
          component: CashFlow,
        },
        {
          path: '/' + getRandomPath(1),
          name: '每日流水',
          component: CashFlowDaily,
        },
      ],
    },
    ];
    for (let i in routs) {
      routeconfigs.push(routs[i]);
    }
    return routeconfigs;
  }
}

