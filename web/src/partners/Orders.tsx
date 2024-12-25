import { Space, Table, Tag, Button } from 'antd';
import type { TableProps } from 'antd';

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
    title: 'PartnerID', dataIndex: 'partner_id', key: 'partner_id',
  },
  {
    title: 'PartnerName', dataIndex: 'partner_name', key: 'partner_name',
  },
  {
    title: 'OrderID', dataIndex: 'order_id', key: 'order_id',
  },
  {
    title: 'OrderState', key: 'order_state', dataIndex: 'order_state',
  },
  {
    title: 'PayState', key: 'pay_state', dataIndex: 'pay_state',
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
    title: 'CreateTime', key: 'create_time', dataIndex: 'create_time',
  },
  {
    title: 'CallbackTime', key: 'callback_time', dataIndex: 'callback_time',
  },
  {
    title: 'CallbackState', key: 'callback_state', dataIndex: 'callback_state',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" size='small'>Details</Button>
      </Space>
    ),
  },
];

const data: DataType[] = [];

function Orders() {
  for(let i=0;i<10;i++) {
    data.push({
      key:'3',partner_id:'123',partner_name:'Joe Black',order_id:'32',order_state:3,pay_state:1,shop_name:'xxx',product_sku:'123',product_id:'123',product_name:'xxx',product_price:'1',pay_user_id:'123',create_time:200,callback_time:200,callback_state:1,
    })
  }
  return (
    <>
      <Table<DataType> 
      bordered
      columns={columns} 
      dataSource={data} />
    </>
  )
}

export default Orders