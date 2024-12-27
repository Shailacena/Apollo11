import { Card, Col, Row, Statistic, StatisticProps, Typography } from "antd";
import { useEffect, useState } from "react";
import { getDataFormat } from "../utils/Tool";
import CountUp from 'react-countup';
import { Line } from "@ant-design/charts";

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

const ChartLine: React.FC = () => {
  const data = [
    { date: '2024-12-1', value: 1007863 },
    { date: '2024-12-2', value: 999999 },
    { date: '2024-12-3', value: 1245678 },
    { date: '2024-12-4', value: 2123432 },
    { date: '2024-12-5', value: 3342221 },
    { date: '2024-12-6', value: 1307863 },
    { date: '2024-12-7', value: 2007863 },
  ];

  const config = {
    data,
    height: 300,
    xField: 'date',
    yField: 'value',
    point: {
      shapeField: 'circle',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: true,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return <Line {...config} />;
};

const Dashboard: React.FC = () => {
  return (
    <div style={{ margin: '0 auto' }}>
      {/* <CustomBreadcrumb arr={['基本','按钮']}/> */}
      <div className="div_time">
        <p>Hello, Boss! Now time is: {CurrentTime()}</p>
      </div>
      <Row gutter={16}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
          <Card title="Total">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Money" value={112893} formatter={formatter} />
              </Col>
              <Col span={12}>
                <Statistic title="Order Num" value={112893} precision={2} formatter={formatter} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <br></br>

      <Card title="Last 7 days">
        <ChartLine />
      </Card>
      <div>
      </div>
    </div>
  );
};

export default Dashboard

