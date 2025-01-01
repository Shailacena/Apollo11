import { Space, Table, Tag, Button, Form, message, Input, Select, Flex, Upload, Card } from 'antd';
import type { SelectProps, TableProps } from 'antd';
import { getDataFormat, getRandomNumber } from '../utils/Tool';
import { SearchOutlined } from '@ant-design/icons';
import UploadDialog from '../components/UploadDialog';
import OrderDetail from './GoodsDetail';
import CurrentLocation from '../components/CurrentLocation';

interface DataType {
  key: string;
  goods_id: string;
  shop_name: string;
  product_sku: string;
  goods_type: string;
  goods_name: string;
  product_price: string;
  goods_state: number;
  pay_state: number;
  pay_account_id: string;
  create_time: number;
  callback_time: number;
  callback_state: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '商品ID', dataIndex: 'goods_id', key: 'goods_id', align: 'center',
  },
  {
    title: '店铺名', key: 'shop_name', dataIndex: 'shop_name', align: 'center',
  },
  {
    title: 'SkuID', key: 'product_sku', dataIndex: 'product_sku', align: 'center',
  },
  {
    title: '商品类型', key: 'goods_type', dataIndex: 'goods_type', align: 'center',
  },
  {
    title: '商品名', key: 'goods_name', dataIndex: 'goods_name', align: 'center',
  },
  {
    title: '商品金额', key: 'product_price', dataIndex: 'product_price', align: 'center',
  },
  {
    title: '实际金额', key: 'product_real_price', dataIndex: 'product_real_price', align: 'center',
  },
  {
    title: '冻结状态', key: 'goods_state', dataIndex: 'goods_state', align: 'center', render: (text) => {
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
    title: '充值状态', key: 'pay_state', dataIndex: 'pay_state', align: 'center', render: (text) => {
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
    title: '充值户号', key: 'pay_account_id', dataIndex: 'pay_account_id', align: 'center',
  },
  {
    title: '创建时间', key: 'create_time', dataIndex: 'create_time', align: 'center', render: (text) => {
      const date = new Date(text);
      return getDataFormat(date);
    }
  },
  {
    title: '回调时间', key: 'callback_time', dataIndex: 'callback_time', align: 'center', render: (text) => {
      const date = new Date(text);
      return getDataFormat(date);
    }
  },
  {
    title: '回调状态', key: 'callback_state', dataIndex: 'callback_state', align: 'center', render: (text) => {
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
    title: '操作',
    key: 'action',
    fixed: 'right', // 固定最右边，配合Table的scroll={{ x: 'max-content' }}使用
    align: 'center',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" size='small' onClick={() => onEditClick('0')}>修改</Button>
        <Button type="primary" size='small' danger onClick={() => onDeleteClick('0')}>冻结</Button>
        <Button type="primary" size='small' danger onClick={() => onDeleteClick('0')}>删除</Button>
        <Button type="primary" size='small' danger onClick={() => onDeleteClick('0')}>取消订单</Button>
      </Space>
    ),
  },
];

const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

const onDeleteClick = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

const onEditClick = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
  return <OrderDetail />
};

const goods_state_options: SelectProps['options'] = [
  {value: 0, label: '正常'},
  {value: 1, label: '冻结'}
];

const pay_state_options: SelectProps['options'] = [
  {value: 0, label: '未充值'},
  {value: 1, label: '部分充值'},
  {value: 2, label: '全部充值'}
];

const callback_state_options: SelectProps['options'] = [
  {value: 0, label: '正常回调'},
  {value: 1, label: '未回调'}
];

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
      // rules={[{ required: true, message: '请输入搜索关键词' }]}
      >
        <Flex vertical={true}>
          <Input placeholder="商品ID" />
        </Flex>
      </Form.Item>
      <Form.Item>
        <Select
          size="middle"
          placeholder="Type"
          defaultValue={'商品状态'}
          onChange={handleChange}
          style={{ width: '100px' }}
          options={goods_state_options}
        />
      </Form.Item>
      <Form.Item>
        <Select
          size="middle"
          placeholder="State"
          defaultValue={'充值状态'}
          onChange={handleChange}
          style={{ width: '100px' }}
          options={pay_state_options}
        />
      </Form.Item>
      <Form.Item>
        <Select
          size="middle"
          placeholder="State"
          defaultValue={'回调状态'}
          onChange={handleChange}
          style={{ width: '100px' }}
          options={callback_state_options}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
        </Button>
      </Form.Item>
    </Form>
  );
};

function Goods() {
  let data: DataType[] = [];
  for (let i = 0; i < 50; i++) {

    data.push({
      key: i.toString(), goods_id: i.toString(), goods_state: getRandomNumber(1, 3), pay_state: getRandomNumber(1, 3), shop_name: 'xxx', product_sku: '123', goods_type: '123', goods_name: 'xxx', product_price: '1', pay_account_id: '123', create_time: 1735131468000, callback_time: 1735131468000, callback_state: getRandomNumber(1, 3),
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
      </Card>
    </>
  )
}

export default Goods