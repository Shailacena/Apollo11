import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AppProvider';
import { getRouteConfig } from './RouteConfigs';
import axios from 'axios';

const TAG = 'Partner Login';

const Login: React.FC = () => {

  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth(); 
  let from = location.state?.from?.pathname || '/';

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // 异步操作或其他需要在渲染之外进行的操作
    if (auth.token) {
      navigate(getRouteConfig()[0].path, { replace: true });
      return;
    }
  }, [auth]);

  const onFinish = (value: any) => {
    try {
      value.id = value.id && Number(value.id)
      auth.partnerSignin(value, () => {
        console.log('from: ', from);
        setTimeout(() => {
          navigate(getRouteConfig()[0].path, { replace: true });
          // 送用户回去他们试图访问的页面
          // navigate(from, { replace: true });
        }, 500);
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && messageApi.open({
          type: 'error',
          content: msg,
        });
      }
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: '0 auto', paddingTop: 100 }}>
      <h2 style={{ textAlign: 'center' }}>合作商管理后台</h2>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="id"
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