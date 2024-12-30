import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTH_TYPE, useAuth } from '../AuthProvider';
import { getRouteConfig } from './RouteConfigs';

const Login: React.FC = () => {

  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || '/';

  const onFinish = (value: any) => {
    console.log('Received values of form: ', value);
    message.success('Login Success!');

    auth.signin(value.username, '', AUTH_TYPE.PARTNER, '', () => {
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
      <h2 style={{ textAlign: 'center' }}>Partner Login</h2>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;