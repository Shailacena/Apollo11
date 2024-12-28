import { Space, Table, Tag, Button } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  order_id: string;
  account_id: string;
  change_money: number;
  balance: number;
  time: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'OrderID', dataIndex: 'order_id', key: 'order_id',
  },
  {
    title: 'AccountID', key: 'account_id', dataIndex: 'account_id',
  },
  {
    title: 'ChangeMoney', key: 'change_money', dataIndex: 'change_money',
  },
  {
    title: 'Balance', key: 'balance', dataIndex: 'balance',
  },
  {
    title: 'Time', key: 'time', dataIndex: 'time', render: (text) => {
      const date = new Date(text);
      return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
    }
  },
  {
    title: 'Action', key: 'action', render: (_, record) => (
      <Space size="middle">
        <Button type="primary" size='small'>Details</Button>
      </Space>
    ),
  },
];

const data: DataType[] = [];

function CashFlow() {
  for(let i=0;i<50;i++) {
    data.push({
      key: i.toString(), order_id: i.toString(), account_id: '123', change_money: 500, balance: 30000, time: 1735131468000
    })
  }
  return (
    <>
      <Table<DataType>
        bordered
        size='small'
        pagination={{ pageSize: 12 }} // 分页
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={data} />
    </>
  )
}

export default CashFlow