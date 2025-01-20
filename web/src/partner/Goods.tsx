import { Table, Button, Form, message, Input, Select, Flex, Card } from 'antd';
import type { SelectProps, TableProps } from 'antd';
import { getDataFormat } from '../utils/Tool';
import { SearchOutlined } from '@ant-design/icons';
import UploadDialog from '../components/UploadDialog';
import CurrentLocation from '../components/CurrentLocation';
import { getRouteConfig } from './RouteConfigs';
import { useEffect, useState } from 'react';
import { useApis } from '../api/api';

interface DataType {
  key: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '合作商单号', dataIndex: 'id', align: 'center', key: 'id', render: (text) => <a>{text}</a>,
  },
  {
    title: '合作商', dataIndex: 'partnerId', align: 'center', key: 'partnerId',
  },
  {
    title: '订单类型', dataIndex: 'rechargeType', align: 'center', key: 'rechargeType',
  },
  {
    title: '今日交易额', key: 'tags', dataIndex: 'tags', align: 'center',
  },
  {
    title: '每日限额', key: 'tags', dataIndex: 'tags', align: 'center',
  },
  {
    title: '店铺', key: 'shopName', dataIndex: 'shopName', align: 'center',
  },
  {
    title: 'skuId', key: 'skuId', dataIndex: 'skuId', align: 'center',
  },
  {
    title: '商品金额', key: 'price', dataIndex: 'price', align: 'center',
  },
  {
    title: '商品实际金额', key: 'realPrice', dataIndex: 'realPrice', align: 'center',
  },
  {
    title: '充值金额', key: 'action',
  },
  {
    title: '已充值', key: 'action',
  },
  {
    title: '订单状态', key: 'action',
  },
  {
    title: '冻结状态', key: 'action', render: (text) => {
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
    title: '充值状态', key: 'action',
  },
  {
    title: '回调状态', key: 'action',
  },
  {
    title: '受理时间', key: 'createAt', dataIndex: 'createAt', align: 'center', render: (text) => {
      const date = new Date(text);
      return getDataFormat(date);
    }
  },
  {
    title: '通知时间', key: 'action',
  },
  {
    title: '备注', key: 'action',
  },
];

const SearchForm = () => {
  
  const goods_state_options: SelectProps['options'] = [
    { value: 0, label: '正常' },
    { value: 1, label: '冻结' }
  ];
  
  const pay_state_options: SelectProps['options'] = [
    { value: 0, label: '未充值' },
    { value: 1, label: '部分充值' },
    { value: 2, label: '全部充值' }
  ];
  
  const callback_state_options: SelectProps['options'] = [
    { value: 0, label: '正常回调' },
    { value: 1, label: '未回调' }
  ];

  const [form] = Form.useForm();

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

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
  const [list, setList] = useState<DataType[]>([])
  let { listGoods } = useApis()

  useEffect(() => {
    fetchListGoods()
  }, [])

  const fetchListGoods = async () => {
    const { data } = await listGoods()
    let d: DataType[] = data?.list?.map((item, index) => {
      let newItem: DataType = {
        key: index.toString(),
        ...item
      }
      return newItem
    })
    console.log('11111222', d)
    setList(d)
  }

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <CurrentLocation routeconfigs={getRouteConfig()} />
      </div>
      <Card>
        <div style={{ display: 'Flex' }}>
          <SearchForm />
          <UploadDialog />
        </div>
        <div>
          <Table<DataType>
            bordered // 边框
            size='small'
            // tableLayout='fixed'
            columns={columns}
            pagination={{ pageSize: 12 }} // 分页
            scroll={{ x: 'max-content' }}
            dataSource={list || []} />
        </div>
      </Card>
    </>
  )
}

export default Goods