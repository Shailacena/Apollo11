import { Layout, Menu, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getRouteConfig, IRoute } from './RouteConfigs';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AppProvider';
import SetPasswordModal from './SetPasswordModal';
import { useState } from 'react';

const TAG = 'PartnerMainLayout'

type MenuItem = Required<MenuProps>['items'][number];

const { Header, Content, Sider, Footer } = Layout;

const menus: MenuItem[] = getRouteConfig().map(
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
    label: "登出",
    key: '0'

  },
  {
    label: "设置密码",
    key: '1'
  }
]

function MainLayout() {
  const [isSetpassowrdModalOpen, setIsSetpassowrdModalOpen] = useState(false);
  const navigate = useNavigate()
  const loc = useLocation()
  const auth = useAuth()

  const onClickMenu: MenuProps['onClick'] = (e) => {
    if (loc.pathname == e.key) {
      return
    }
    console.log(TAG, 'onClickMenu', e.key)
    navigate(e.key)
  }

  const updateIsSetpassowrdModalOpen = (isOpen: boolean) => {
    setIsSetpassowrdModalOpen(isOpen);
  };
  
  return (
    <>
      <SetPasswordModal isOpen={isSetpassowrdModalOpen} updateIsSetpassowrdModalOpen={updateIsSetpassowrdModalOpen} />
      <Layout>
        <Header style={{ color: "#fff", height: 48 }}>
          <span>合作商管理后台</span>
          <span style={{ position: 'absolute', right: 20 }}>
            <Dropdown menu={{ items, onClick:({ key })=>{
              if (key === '0'){
                auth.partnerSignout(()=>{})
              } else if (key === '1') {
                setIsSetpassowrdModalOpen(true)
              }
            } }} trigger={['click']}>
              <a style={{ color: "#fff" }} onClick={(e) => e.preventDefault()}>
                <Space>
                  {auth.name}
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
