import { Space, Table, Tag, Button, Form, message, Input, Select, Flex, Upload } from 'antd';
import type { SelectProps, TableProps } from 'antd';
import { getDataFormat, getRandomNumber } from '../utils/Tool';
import { SearchOutlined } from '@ant-design/icons';
import UploadDialog from '../components/UploadDialog';
import OrderDetail from './OrderDetail';

interface DataType {
  key: string;
  partner_id: string;
  partner_name: string;
  order_id: string;
  order_state: number;
  pay_state: number;
  shop_name: string;
  product_sku: string;
  product_id: string;
  product_name: string;
  product_price: string;
  pay_user_id: string;
  create_time: number;
  callback_time: number;
  callback_state: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'OrderID', dataIndex: 'order_id', key: 'order_id',
  },
  {
    title: 'PartnerID', dataIndex: 'partner_id', key: 'partner_id',
  },
  {
    title: 'PartnerName', dataIndex: 'partner_name', key: 'partner_name',
  },
  {
    title: 'OrderState', key: 'order_state', dataIndex: 'order_state', render: (text) => {
      if (text === 2) {
        return <div style={{ color: 'green' }}>Success</div>
      }
      if (text === 1) {
        return <div style={{ color: 'blue' }}>In progress</div>
      }
      if (text === 3) {
        return <div style={{ color: 'red' }}>Fail</div>
      }
    }
  },
  {
    title: 'PayState', key: 'pay_state', dataIndex: 'pay_state', render: (text) => {
      if (text === 2) {
        return <div style={{ color: 'green' }}>Success</div>
      }
      if (text === 1) {
        return <div style={{ color: 'blue' }}>In progress</div>
      }
      if (text === 3) {
        return <div style={{ color: 'red' }}>Fail</div>
      }
    }
  },
  {
    title: 'ShopName', key: 'shop_name', dataIndex: 'shop_name',
  },
  {
    title: 'SkuID', key: 'product_sku', dataIndex: 'product_sku',
  },
  {
    title: 'ProductID', key: 'product_id', dataIndex: 'product_id',
  },
  {
    title: 'ProductName', key: 'product_name', dataIndex: 'product_name',
  },
  {
    title: 'ProductPrice', key: 'product_price', dataIndex: 'product_price',
  },
  {
    title: 'PayUserID', key: 'pay_user_id', dataIndex: 'pay_user_id',
  },
  {
    title: 'CreateTime', key: 'create_time', dataIndex: 'create_time', render: (text) => {
      const date = new Date(text);
      return getDataFormat(date);
    }
  },
  {
    title: 'CallbackTime', key: 'callback_time', dataIndex: 'callback_time', render: (text) => {
      const date = new Date(text);
      return getDataFormat(date);
    }
  },
  {
    title: 'CallbackState', key: 'callback_state', dataIndex: 'callback_state', render: (text) => {
      if (text === 2) {
        return <div style={{ color: 'green' }}>Success</div>
      }
      if (text === 1) {
        return <div style={{ color: 'blue' }}>In progress</div>
      }
      if (text === 3) {
        return <div style={{ color: 'red' }}>Fail</div>
      }
    }
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right', // 固定最右边，配合Table的scroll={{ x: 'max-content' }}使用
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" size='small' onClick={() => onDetailClick('0')}>Details</Button>
      </Space>
    ),
  },
];

const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

const onDetailClick = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
  return <OrderDetail />
};

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

const SearchForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Search values:', values);
    message.success('Search Success!');
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={onFinish}
      style={{ marginBottom: 16 }}
    >
      <Form.Item
        name="searchKeyword"
        label="Filter"
      // rules={[{ required: true, message: '请输入搜索关键词' }]}
      >
        <Flex vertical={true}>
          <Input placeholder="OrderID" />
        </Flex>
      </Form.Item>
      <Form.Item>
        <Select
          size="middle"
          placeholder="Type"
          defaultValue={'Type'}
          onChange={handleChange}
          style={{ width: '100px' }}
          options={options}
        />
      </Form.Item>
      <Form.Item>
        <Select
          size="middle"
          placeholder="State"
          defaultValue={'State'}
          onChange={handleChange}
          style={{ width: '100px' }}
          options={options}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
        </Button>
      </Form.Item>
    </Form>
  );
};

function Orders() {
  let data: DataType[] = [];
  for (let i = 0; i < 50; i++) {

    data.push({
      key: i.toString(), partner_id: '10089', partner_name: 'Joe Black', order_id: i.toString(), order_state: getRandomNumber(1, 3), pay_state: getRandomNumber(1, 3), shop_name: 'xxx', product_sku: '123', product_id: '123', product_name: 'xxx', product_price: '1', pay_user_id: '123', create_time: 1735131468000, callback_time: 1735131468000, callback_state: getRandomNumber(1, 3),
    })
  }
  return (
    <>
      <div style={{display: 'Flex'}}>
        <SearchForm />
        <UploadDialog />
      </div>
      <div>
        <Table<DataType>
          bordered
          size='small'
          // tableLayout='fixed'
          columns={columns}
          pagination={{ pageSize: 12 }} // 分页
          scroll={{ x: 'max-content' }}
          dataSource={data} />
      </div>
    </>
  )
}

export default Orders