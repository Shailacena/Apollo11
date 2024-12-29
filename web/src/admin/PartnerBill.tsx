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
    title: '用户编号',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '用户类型',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '变更金额',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '当前余额',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '备注',
    key: 'action',
  },
  {
    title: '时间',
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

function PartnerBill() {

  return (
    <>
      <Table<DataType> columns={columns} dataSource={data} />
    </>
  )
}

export default PartnerBill