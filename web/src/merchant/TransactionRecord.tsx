import { SearchOutlined } from '@ant-design/icons';
import { Table, Button, Form, message, DatePicker, Card, ConfigProvider } from 'antd';
import type { TableProps } from 'antd';
import CurrentLocation from '../components/CurrentLocation';
import locale from 'antd/locale/zh_CN';
import { getRouteConfig } from './RouteConfigs';

interface DataType {
  key: string;
  notes: string;
  change_money: number;
  balance: number;
  time: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '备注', dataIndex: 'notes', key: 'notes', align: 'center',
  },
  {
    title: '变更金额', key: 'change_money', dataIndex: 'change_money', align: 'center',
  },
  {
    title: '当前余额', key: 'balance', dataIndex: 'balance', align: 'center',
  },
  {
    title: '时间', key: 'time', dataIndex: 'time', align: 'center', render: (text) => {
      const date = new Date(text);
      return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
    }
  }
];

const data: DataType[] = [];

function TransactionRecord() {
  for (let i = 0; i < 50; i++) {
    data.push({
      key: i.toString(), notes: i.toString(), change_money: 500, balance: 30000, time: 1735131468000
    })
  }
  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <CurrentLocation routeconfigs={getRouteConfig()} />
      </div>
      <Card>
        <div style={{ display: 'Flex' }}>
          <SearchForm />
          <Button type="primary" onClick={() => toggleModal()}>
            导出
          </Button>
        </div>
        <Table<DataType>
          bordered
          size='small'
          pagination={{ pageSize: 12 }} // 分页
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={data || []} />
      </Card>
    </>
  )
}

const SearchForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Search values:', values);
    message.success('Search Success!');
  };

  const { RangePicker } = DatePicker;

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={onFinish}
      style={{ marginBottom: 16 }}
    >
      <Form.Item
        name="searchKeyword"
        label="日期"
      >
        <ConfigProvider locale={locale}>
          <RangePicker
            id={{
              start: 'startInput',
              end: 'endInput',
            }} />
        </ConfigProvider>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
        </Button>
      </Form.Item>
    </Form>
  );
};

const toggleModal = () => {
  message.warning('功能还未完成...');
};

export default TransactionRecord