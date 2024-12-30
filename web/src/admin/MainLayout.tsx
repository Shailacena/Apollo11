import React from 'react';
import { Layout, Menu, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { routes } from './routes';
import { AUTH_TYPE, useAuth } from '../AuthProvider';

const { Header, Content, Sider, Footer } = Layout;

const menuItems: MenuProps['items'] = routes.map(
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
          <span>管理后台</span>
          <span style={{ position: 'absolute', right: 20 }}>
            <Dropdown menu={{
              items, onClick: ({ key }) => {
                if (key === '0') {
                  auth.signout(auth.admin, () => { })
                }
              }
            }} trigger={['click']}>
              <a style={{ color: "#fff" }} onClick={(e) => e.preventDefault()}>
                <Space>
                  超级管理员
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
              items={menuItems}
              onClick={onClickMenu}
            />
          </Sider>
          <Content style={{ padding: '30px', height: "calc(100vh - (40px + 48px))" }}>
            <Outlet />
          </Content>
        </Layout>
        <Footer style={{ padding: "12px 50px", textAlign: 'center' }}>
          Copyright ©{new Date().getFullYear()} 管理后台
        </Footer>
      </Layout>
    </>
  )
}

export default MainLayout
