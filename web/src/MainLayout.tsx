import React from 'react';
import { Layout, Menu, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { routes, IRoute } from './routes';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

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
            <Dropdown menu={{ items }} trigger={['click']}>
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

            <Routes>
              {routes.map((r: IRoute) => {
                return r?.children ? r.children.map((childRoute: IRoute) => (
                  <Route key={r.path + childRoute.path} path={r.path + childRoute.path} element={<childRoute.component />} />
                )) : <Route key={r.path} path={r.path} element={<r.component />} />
              })}
            </Routes>

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
