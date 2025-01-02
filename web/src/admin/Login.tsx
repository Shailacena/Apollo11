import { Flex, Button, Card, Form, Input, message } from 'antd';
import bg from '../assets/bg.jpg';
import { AUTH_TYPE, useAuth } from '../AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import { adminLogin, AdminLoginReq } from '../api/api';
import axios from 'axios';

function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let from = location.state?.from?.pathname || '/';

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<AdminLoginReq>['onFinish'] = async (value) => {
    try {
      const resp = await adminLogin(value)

      console.log(resp);

      auth.signin(value.username, value.password, AUTH_TYPE.ADMIN, resp.token, () => {
        // 使用 { replace: true } 保证我们不会把login放入history栈
        // 意味着当用户点击回退，他不会重新回退到login页面
        console.log('from: ', from);
        setTimeout(() => {
          // 送用户回去他们试图访问的页面
          // navigate(from, { replace: true });
          navigate('/admin/home', { replace: true });
        }, 500);
      });

      navigate('/admin/home', { replace: true });
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
