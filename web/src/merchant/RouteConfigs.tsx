import { HomeOutlined, ShopOutlined } from '@ant-design/icons';
import TransactionRecord from './TransactionRecord';
import { getRandomPath } from '../utils/Tool';
import CashFlowDaily from './CashFlowDaily';
import Dashboard from './Dashboard';

export interface IRoute {
  name: string
  path: string
  component: any,
  icon?: any,
  children?: Array<IRoute>
}

enum MODEL_PATH {
  HOME, TRANSACTION
}

const routeconfigs: IRoute[] = []

export function getRouteConfig(): Array<IRoute> {
  if (routeconfigs.length != 0) {
    return routeconfigs;
  } else {
    let routs = [{
      // path: '/merchant/home',
      path: '/merchant/' + getRandomPath(MODEL_PATH.HOME),
      name: '首页',
      component: Dashboard,
      icon: HomeOutlined,
    },
    {
      path: '/merchant/' + getRandomPath(MODEL_PATH.TRANSACTION),
      name: '交易管理',
      icon: ShopOutlined,
      component: null,
      children: [
        {
          path: '/' + getRandomPath(0),
          name: '交易记录',
          component: TransactionRecord,
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

