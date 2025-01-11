import { Layout, Menu, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { routes } from './routes';
import { useAppContext } from '../AppProvider';
import { useEffect, useState } from 'react';
import CurrentLocation from '../components/CurrentLocation';

const { Header, Content, Sider, Footer } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const items: MenuProps['items'] = [
  {
    label: "登出",
    key: '0'
  }
]

function MainLayout() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const navigate = useNavigate()
  const loc = useLocation()
  const ctx = useAppContext()

  const nickname = ctx?.cookie?.nickname

  useEffect(() => {
    let all = routes.filter((route) => {
      let isShow = route.permission ? route.permission == ctx.cookie.role : true
      if (!isShow) {
        return false
      }

      route.children = route.children?.filter((subRoute) => {
        return subRoute.permission ? subRoute.permission == ctx.cookie.role : true
      })
      return true
    })

    let menu = all.map(
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

    setMenuItems(menu)
  }, [ctx.cookie])

  const onClickMenu: MenuProps['onClick'] = (e) => {
    if (loc.pathname == e.key) {
      return
    }
    navigate(e.key)
  }

  const levelKeys = getLevelKeys(menuItems as LevelKeysProps[]);
  const [stateOpenKeys, setStateOpenKeys] = useState([routes[0].path, routes[0].path]);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    console.log('icccc onOpenChange', openKeys)
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // console.log('icccc onOpenChange', currentOpenKey)
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      console.log(openKeys
        // remove repeat key
        .filter((_, index) => index !== repeatIndex)
        // remove current level all child
        .filter((key) => {
          return levelKeys[key] <= levelKeys[currentOpenKey]
        }))
      setStateOpenKeys(
        [openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]).pop() || openKeys[0]],
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
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
                  ctx.auth.adminSignout(() => { })
                }
              }
            }} trigger={['click']}>
              <a style={{ color: "#fff" }} onClick={(e) => e.preventDefault()}>
                <Space>
                  {nickname}
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
              defaultSelectedKeys={[routes[0].path]}
              items={menuItems}
              openKeys={stateOpenKeys}
              onOpenChange={onOpenChange}
              onClick={onClickMenu}
            />
          </Sider>
          <Content style={{ padding: '30px', height: "calc(100vh - (40px + 48px))" }}>
            <div style={{ marginBottom: '10px' }}>
              <CurrentLocation routeconfigs={routes} />
            </div>
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
