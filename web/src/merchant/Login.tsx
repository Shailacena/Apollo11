import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTH_TYPE, useAuth } from '../AuthProvider';
import { getRouteConfig } from './RouteConfigs';
import { useCookies } from 'react-cookie';

const TAG = 'Merchant Login';

const Login: React.FC = () => {

  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let [cookies] = useCookies(['token']);  
  let from = location.state?.from?.pathname || '/';

  useEffect(() => {
    // 异步操作或其他需要在渲染之外进行的操作
    if (auth.partner) {
      navigate(getRouteConfig()[0].path, { replace: true });
      return;
    }
    // cookie登陆
    if (cookies.token) {
      auth.checkToken(AUTH_TYPE.PARTNER, cookies.token, () => { });
      return;
    }
  }, [auth]);

  const onFinish = (value: any) => {
    console.log('Received values of form: ', value);
    message.success('登陆成功!');

    auth.signin(value.username, '', AUTH_TYPE.MERCHANT, '', () => {
      // 使用 { replace: true } 保证我们不会把login放入history栈
      // 意味着当用户点击回退，他不会重新回退到login页面
      console.log('from: ', from);
      setTimeout(() => {
        // 送用户回去他们试图访问的页面
        // navigate(from, { replace: true });
        navigate(getRouteConfig()[0].path, { replace: true });
      }, 500);
    });
  };

  return (
    <div style={{ maxWidth: 300, margin: '0 auto', paddingTop: 100 }}>
      <h2 style={{ textAlign: 'center' }}>商户管理后台</h2>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入帐号!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="帐号" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;