import { useEffect, useState } from 'react';
import { Button, Card, DatePicker, Flex, Form, Input, message, Select, Table } from 'antd';
import type { DatePickerProps, SelectProps, TableProps } from 'antd';
import { useApis } from '../api/api';
import { SearchOutlined } from '@ant-design/icons';


interface DataType {
  key: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '平台订单号',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '商户订单号',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '商户号',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '官方单号',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '订单金额',
    key: 'action',
  },
  {
    title: '支付类型',
    key: 'action',
  },
  {
    title: '下单账号',
    key: 'action',
  },
  {
    title: '状态',
    key: 'action',
  },
  {
    title: 'skuId',
    key: 'action',
  },
  {
    title: '店铺',
    key: 'action',
  },
  {
    title: '下单时间',
    key: 'action',
  },
  {
    title: '地区',
    key: 'action',
  },
  {
    title: '回调状态',
    key: 'action',
  },
  {
    title: 'ip',
    key: 'action',
  },
  {
    title: '设备类型',
    key: 'action',
  },
  {
    title: '备注',
    key: 'action',
  },
];

function TradingRecord() {

  const [list, setList] = useState<DataType[]>([])
  let { listOrder } = useApis()

  const fetchListOrder = async () => {
    const { data } = await listOrder()
    let d: DataType[] = data?.list?.map((item, index) => {
      let newItem: DataType = {
        key: index.toString(),
        ...item
      }
      return newItem
    })
    setList(d)
  }

  useEffect(() => {
    fetchListOrder()
  }, [])

  return (
    <>
      <Card>
        <div style={{ display: 'Flex' }}>
          <SearchForm />
        </div>
        <Table<DataType>
          bordered
          pagination={{ pageSize: 12 }} // 分页
          columns={columns}
          dataSource={list}
          scroll={{ x: 'max-content' }} />
      </Card>
    </>
  )
}

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

  const onFinish = (values: any) => {
    console.log('Search values:', values);
    message.success('Search Success!');
  };

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={onFinish}
      style={{ marginBottom: 16 }}
    >
      <Form.Item name="searchKeyword">
        <Flex vertical={true}>
          <Input placeholder="平台单号" style={{ width: 80 }}/>
        </Flex>
      </Form.Item>
      <Form.Item name="searchKeyword">
        <Flex vertical={true}>
          <Input placeholder="商户单号" style={{ width: 80 }}/>
        </Flex>
      </Form.Item>
      <Form.Item name="searchKeyword">
        <Flex vertical={true}>
          <Input placeholder="官方单号" style={{ width: 80 }}/>
        </Flex>
      </Form.Item>
      <Form.Item name="searchKeyword">
        <Flex vertical={true}>
          <Input placeholder="订单金额" style={{ width: 80 }}/>
        </Flex>
      </Form.Item>
      <Form.Item name="searchKeyword">
        <Flex vertical={true}>
          <Input placeholder="下单账号" style={{ width: 80 }}/>
        </Flex>
      </Form.Item>
      <Form.Item name="searchKeyword">
        <Flex vertical={true}>
          <Input placeholder="店铺" style={{ width: 80 }}/>
        </Flex>
      </Form.Item>
      <Form.Item name="searchKeyword">
        <Flex vertical={true}>
          <Input placeholder="skuid" style={{ width: 80 }}/>
        </Flex>
      </Form.Item>
      <Form.Item name="searchKeyword">
        <Flex vertical={true}>
          <Input placeholder="ip" style={{ width: 80 }}/>
        </Flex>
      </Form.Item>
      <Form.Item>
        <Select
          size="middle"
          placeholder="Type"
          defaultValue={'支付类型'}
          onChange={handleChange}
          style={{ width: '100px' }}
          options={goods_state_options}
        />
      </Form.Item>
      <Form.Item>
        <Select
          size="middle"
          placeholder="State"
          defaultValue={'订单状态'}
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
        <DatePicker onChange={onDateChange}style={{ width: 100 }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TradingRecord