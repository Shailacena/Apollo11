import { Flex, Button, Card, Form, Input, message } from 'antd';
import bg from '../assets/bg.jpg';
import { useAppContext } from '../AppProvider';
import { useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import { useApis } from '../api/api';
import axios from 'axios';
import { useEffect } from 'react';
import { AdminLoginReq } from '../api/types';

function Login() {
  let navigate = useNavigate();
  let ctx = useAppContext();
  let { adminLogin } = useApis()

  useEffect(() => {
    if (ctx.cookie.token) {
      goHome();
    }
  }, []);

  const goHome = () => {
    navigate('/admin/home', { replace: true });
  }

  const onFinish: FormProps<AdminLoginReq>['onFinish'] = async (value) => {
    try {
      const { data } = await adminLogin(value)
      ctx.auth.adminSignin(data, value.username, () => {
        setTimeout(() => {
          goHome();
        }, 500);
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let msg = e.response?.data?.message
        msg && message.error(msg)
      }
    }
  };


  return (
    <>
      <Flex style={{ height: "100%", backgroundImage: `url(${bg})`, backgroundSize: "cover" }} >
        <Card className="login" title={<h2>管理后台</h2>}>
          {/* <h1>管理后台</h1> */}
          <Form
            name="basic"
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item<AdminLoginReq>
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="用户名" />
            </Form.Item>

            <Form.Item<AdminLoginReq>
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="密码" />
            </Form.Item>

            {/* <Form.Item<AdminLoginReq>
              name="verificode"
              rules={[{ required: true, message: '请输入谷歌验证码' }]}
            >
              <Input placeholder="谷歌验证码" />
            </Form.Item> */}

            <Form.Item>
              <Button size="large" block type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form >
        </Card>
      </Flex>
    </>
  )
}

export default Login
