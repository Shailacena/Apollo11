import { Flex, Button, Card, Form, Input, message } from 'antd';
import bg from '../assets/bg.jpg';
import { useAppContext } from '../AppProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import { AdminLoginReq, useApis } from '../api/api';
import axios from 'axios';
import { useEffect } from 'react';
import { routes } from './routes';

function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let ctx = useAppContext();
  let from = location.state?.from?.pathname || '/';
  let { adminLogin } = useApis()

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // 异步操作或其他需要在渲染之外进行的操作
    console.log('icccc =====> admin useEffect')
    if (ctx.auth.token) {
      navigate(routes[0].path, { replace: true });
      return;
    }
  }, [ctx.auth]);

  const onFinish: FormProps<AdminLoginReq>['onFinish'] = async (value) => {
    try {
      const { data } = await adminLogin(value)
      ctx.auth.adminSignin(data, () => {
        console.log('from: ', from);
        setTimeout(() => {
          navigate('/admin/home', { replace: true });
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
    <>
      {contextHolder}
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

            {/* <Form.Item<FieldType>
              name="googleCode"
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
