import { Typography, Divider, Row, Col, Card, Statistic } from 'antd';
const { Title, Paragraph } = Typography;

function Dashboard() {
  return (
    <>
      <Typography>
        <Title>欢迎</Title>
        <Paragraph>超级管理员</Paragraph>
        {/* <Paragraph>当前时间： {new Date().toString()}</Paragraph> */}
      </Typography>

      <Divider />

      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="平台收入金额"
              value={580000}
              valueStyle={{ color: '#3f8600' }}
              suffix="元"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="可用账号"
              value={90}
              valueStyle={{ color: '#3f8600' }}
              suffix="个"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="可用代理IP"
              value={200}
              valueStyle={{ color: '#3f8600' }}
              suffix="个"
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard