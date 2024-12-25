import React, { Children } from 'react';
import { Layout, Menu, Dropdown, Space } from 'antd';
import { AccountBookOutlined, BarsOutlined, EllipsisOutlined, LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const { Header, Content, Sider, Footer } = Layout;

const menus: MenuItem[] = [
  { key: '1', label: 'Setting', icon: <UserOutlined /> },
  { key: '2', label: 'Orders', icon: <AccountBookOutlined /> },
  {
    key: 'sub1', label: 'CashFlow', icon: <BarsOutlined />,
    children: [
      { key: 'sub1_1', label: 'Daily', icon: <EllipsisOutlined /> },
      { key: 'sub1_2', label: 'Total', icon: <EllipsisOutlined /> }
    ]
  }
];

interface MainLayoutProps {
  children?: React.ReactElement
}

const items: MenuProps['items'] = [
  {
    label: "Logout",
    key: '0'
  }
]

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Layout>
        <Header style={{ color: "#fff", height: 48 }}>
          <span>Content-Manage-System</span>
          <span style={{ position: 'absolute', right: 20 }}>
            <Dropdown menu={{ items }} trigger={['click']}>
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
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={menus}
            />
          </Sider>
          <Content style={{ padding: '30px', height: "calc(100vh - (40px + 48px))" }}>
            {children}
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
