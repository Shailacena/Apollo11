import { Card, Col, Row, Statistic, StatisticProps, Typography } from "antd";
import { useEffect, useState } from "react";
import { getDataFormat } from "../utils/Tool";
import CountUp from 'react-countup';

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(getDataFormat(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getDataFormat(new Date()));
    }, 1000);

    // 清除间隔，以防内存泄漏
    return () => clearInterval(interval);
  }, []);

  return (
    <Typography.Text>{currentTime}</Typography.Text>
  );
};

const Home: React.FC = () => {
  return (
    <div style={{ margin: '0 auto' }}>
      {/* <CustomBreadcrumb arr={['基本','按钮']}/> */}
      <div className="div_time">
        <p>Hello, Boss! Now time is: {CurrentTime()}</p>
      </div>
      <Card title="Today">
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Money" value={112893} formatter={formatter} />
          </Col>
          <Col span={12}>
            <Statistic title="Order Num" value={112893} precision={2} formatter={formatter} />
          </Col>
        </Row>
      </Card>
<br></br>
      <Card title="Month">
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Money" value={112893} formatter={formatter} />
          </Col>
          <Col span={12}>
            <Statistic title="Order Num" value={112893} precision={2} formatter={formatter} />
          </Col>
        </Row>
      </Card>
      <div>
      </div>
    </div>
  );
};

export default Home

