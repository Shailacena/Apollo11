import { HomeOutlined, MergeCellsOutlined, TableOutlined, UserOutlined, ShopOutlined, SettingOutlined, PayCircleOutlined } from '@ant-design/icons';
import Dashboard from './Dashboard';
import Admin from './Admin';
import RealNameAccount from './RealNameAccount';
import JDAccount from './JDAccount';
import Partner from './Partner';
import PartnerBill from './PartnerBill';
import Order from './Order';
import Merchant from './Merchant';
import DailyBill from './DailyBill';
import TradingRecord from './TradingRecord';


export interface IRoute {
  name: string
  path: string
  component: any,
  icon?: any,
  children?: Array<IRoute>
}

export const routes: Array<IRoute> = [
  {
    path: '/admin/home',
    name: '首页',
    component: Dashboard,
    icon: HomeOutlined,
  },
  {
    path: '/admin/manager',
    name: '管理员',
    icon: UserOutlined,
    component: null,
    children: [
      {
        path: '/list',
        name: '实名资料',
        component: Admin,
      },
    ],
  },
  {
    path: '/admin/account',
    name: '账号管理',
    icon: TableOutlined,
    component: null,
    children: [
      {
        path: '/realNameAccount',
        name: '实名资料',
        component: RealNameAccount,
      },
      {
        path: '/jdAccount',
        name: '京东账号',
        component: JDAccount,
      },
    ],
  },
  {
    path: '/admin/partner',
    name: '合作商管理',
    icon: ShopOutlined,
    component: null,
    children: [
      {
        path: '/list',
        name: '合作商列表',
        component: Partner,
      },
      {
        path: '/order',
        name: '交易订单',
        component: Order,
      },
      {
        path: '/partnerBill',
        name: '账户流水',
        component: PartnerBill,
      },
    ],
  },
  {
    path: '/admin/merchant',
    name: '商户管理',
    icon: MergeCellsOutlined,
    component: null,
    children: [
      {
        path: '/list',
        name: '商户列表',
        component: Merchant,
      },
    ],
  },
  {
    path: '/admin/trade',
    name: '交易统计',
    icon: PayCircleOutlined,
    component: null,
    children: [
      {
        path: '/dailyBill',
        name: '每日流水',
        component: DailyBill,
      },
      {
        path: '/tradingRecord',
        name: '交易记录',
        component: TradingRecord,
      },
    ],
  },
  {
    path: '/admin/setting',
    name: '系统设置',
    icon: SettingOutlined,
    component: null,
    children: [
      {
        path: '/config',
        name: '配置',
        component: Merchant,
      },
    ],
  },
];
