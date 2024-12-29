import { useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';


interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}



const columns: TableProps<DataType>['columns'] = [
  {
    title: '日期',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '成功总金额',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '微信缴费',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '支付宝缴费',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '支付宝手动缴费',
    key: 'action',
  },
  {
    title: '微信',
    key: 'action',
  },
  {
    title: '成功率',
    key: 'action',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

function DailyBill() {

  return (
    <>
      <Table<DataType> columns={columns} dataSource={data} />
    </>
  )
}

export default DailyBill