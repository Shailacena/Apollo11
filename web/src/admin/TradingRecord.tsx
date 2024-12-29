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

function TradingRecord() {

  return (
    <>
      <Table<DataType> columns={columns} dataSource={data} />
    </>
  )
}

export default TradingRecord