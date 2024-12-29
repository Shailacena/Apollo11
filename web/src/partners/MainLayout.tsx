import { Layout, Menu, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { IRoute, RouteConfigs } from './RouteConfigs';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AUTH_TYPE, useAuth } from '../AuthProvider';

type MenuItem = Required<MenuProps>['items'][number];

const { Header, Content, Sider, Footer } = Layout;

const menus: MenuItem[] = RouteConfigs.map(
  (menu) => {
    return {
      key: menu.path,
      icon: menu.icon ? <menu.icon /> : null,
      label: menu.name,

      children: menu.children?.map((sub) => {
        return {
          key: menu.path + sub.path,
          label: sub.name,
        };
      }),
    };
  },
);

const items: MenuProps['items'] = [
  {
    label: "Logout",
    key: '0'

  },
  {
    label: "Set Password",
    key: '1'
  }
]

function MainLayout() {

  const navigate = useNavigate()
  const loc = useLocation()
  const auth = useAuth()

  const onClickMenu: MenuProps['onClick'] = (e) => {
    if (loc.pathname == e.key) {
      return
    }

    navigate(e.key)
  }
  
  return (
    <>
      <Layout>
        <Header style={{ color: "#fff", height: 48 }}>
          <span>Content-Manage-System</span>
          <span style={{ position: 'absolute', right: 20 }}>
            <Dropdown menu={{ items, onClick:({ key })=>{
              if (key === '0'){
                auth.signout(AUTH_TYPE.PARTNER, ()=>{})
              }
            } }} trigger={['click']}>
              <a style={{ color: "#fff" }} onClick={(e) => e.preventDefault()}>
                <Space>
                  Partners
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </span>
        </Header>
        <Layout>
          <Sider width={200}>
            <Menu
              mode="inline"
              style={{ height: '100%' }}
              items={menus}
              onClick={onClickMenu}
            />
          </Sider>
          <Content style={{ padding: '30px', height: "calc(100vh - (40px + 48px))" }}>
            <Outlet />
          </Content>
        </Layout>
        <Footer style={{ padding: "12px 50px", textAlign: 'center' }}>
          Copyright ©{new Date().getFullYear()} Content-Manage-System
        </Footer>
      </Layout>
    </>
  )
}

export default MainLayout
