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
    title: '合作商单号',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '合作商',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '订单类型',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '今日交易额',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '每日限额',
    key: 'action',
  },
  {
    title: '店铺',
    key: 'action',
  },
  {
    title: 'skuId',
    key: 'action',
  },
  {
    title: '商品金额',
    key: 'action',
  },
  {
    title: '商品实际金额',
    key: 'action',
  },
  {
    title: '充值金额',
    key: 'action',
  },
  {
    title: '已充值',
    key: 'action',
  },
  {
    title: '订单状态',
    key: 'action',
  },
  {
    title: '冻结状态',
    key: 'action',
  },
  {
    title: '充值状态',
    key: 'action',
  },
  {
    title: '回调状态',
    key: 'action',
  },
  {
    title: '受理时间',
    key: 'action',
  },
  {
    title: '通知时间',
    key: 'action',
  },
  {
    title: '备注',
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

function Order() {

  return (
    <>
      <Table<DataType> columns={columns} dataSource={data} />
    </>
  )
}

export default Order