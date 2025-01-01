import { SearchOutlined } from '@ant-design/icons';
import { Space, Table, Tag, Button, Form, message, Flex, Input, Select, DatePicker, Card } from 'antd';
import type { SelectProps, TableProps } from 'antd';
import UploadDialog from '../components/UploadDialog';
import CurrentLocation from '../components/CurrentLocation';

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

function CashFlow() {
  for (let i = 0; i < 50; i++) {
    data.push({
      key: i.toString(), notes: i.toString(), change_money: 500, balance: 30000, time: 1735131468000
    })
  }
  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <CurrentLocation />
      </div>
      <Card>
        <div style={{ display: 'Flex' }}>
          <SearchForm />
          <Button type="primary" onClick={() => toggleModal(0, true)}>
            导出
          </Button>
        </div>
        <Table<DataType>
          bordered
          size='small'
          pagination={{ pageSize: 12 }} // 分页
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={data} />
      </Card>
    </>
  )
}

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

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
        label="Date"
      >
        <RangePicker
          id={{
            start: 'startInput',
            end: 'endInput',
          }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
        </Button>
      </Form.Item>
    </Form>
  );
};

const toggleModal = (idx: number, target: boolean) => {
  message.warning('功能还未完成...');
};

export default CashFlow