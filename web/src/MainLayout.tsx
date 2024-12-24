import React from 'react';
import { Layout, Menu, Dropdown, Space } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const { Header, Content, Sider, Footer } = Layout;

const menus = ['管理员', '账号管理'];

const items2: MenuProps['items'] = menus.map(
  (menu, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(UserOutlined),
      label: `${menu}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

interface MainLayoutProps {
  children?: React.ReactElement
}

const items: MenuProps['items'] = [
  {
    label: "登出",
    key: '0'
  }
]

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Layout>
        <Header style={{ color: "#fff", height: 48 }}>
          <span>管理后台</span>
          <span style={{ position: 'absolute', right: 20 }}>
            <Dropdown menu={{ items }} trigger={['click']}>
              <a style={{color: "#fff"}} onClick={(e) => e.preventDefault()}>
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
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: '30px', height: "calc(100vh - (40px + 48px))" }}>
            {children}
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
