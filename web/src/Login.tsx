import { Flex, Button, Card, Form, Input } from 'antd';
import bg from './assets/bg.jpg';
import useSWR, {Fetcher} from "swr";

type FieldType = {
  username?: string;
  password?: string;
  googleCode?: string;
};

const loginFetcher: Fetcher<string, string>  = (...args) => fetch(...args).then((res) => res.json())

function Login() {
  const { data, error } = useSWR("/api/user/123", loginFetcher)

  console.log(data, error)

  return (
    <>
      <Flex style={{ height: "100%", backgroundImage: `url(${bg})`, backgroundSize: "cover" }} >
        <Card className="login" title={<h2>管理后台</h2>}>
          {/* <h1>管理后台</h1> */}
          <Form
            name="basic"
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="用户名" />
            </Form.Item>

            <Form.Item<FieldType>
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
